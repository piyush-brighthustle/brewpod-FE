import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS } from '../../../constants/actionTypes';
import apiClient from '../../../services/apiClient';
import { setAuthToken, setUser } from '../../../utils/tokenUtils';
import { Credentials } from '../../../types/authTypes';
import { LOGIN } from '../../../constants/routeNames';

export default ({ email, password }: Credentials) =>
  async (dispatch: any) => {
    dispatch({
      type: LOGIN_LOADING,
    });
    await apiClient
      .post(LOGIN, {
        email,
        password,
      })
      ?.then((res) => {
        if (res.data.user) {
          setAuthToken(res?.data?.token);
          setUser(res?.data?.user);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response ? err.response.data : { error: 'Something went wrong, try agin' },
        });
      });
  };

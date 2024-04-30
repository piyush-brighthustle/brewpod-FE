import { LOGOUT_USER } from '../../../constants/actionTypes';
import { removeAuthToken, removeUser } from '../../../utils/tokenUtils';
import apiClient from '../../../services/apiClient';
import { LOGOUT } from '../../../constants/routeNames';

export default () => async (dispatch: any) => {
  removeAuthToken();
  removeUser();
  dispatch({ type: LOGOUT_USER });

  await apiClient
    .post(LOGOUT)
    ?.then((res) => {
      console.log('res', res);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

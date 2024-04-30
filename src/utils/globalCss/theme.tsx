import { COLOR_PALETTE } from '../../types/enums';

export type ButtonThemes = {
  [key: string]: {
    borderColor: string;
    backgroundColor: string;
    imageTintColor: string;
    textColor: string;
  };
};

export const lightTheme: ButtonThemes = {
  edit: {
    borderColor: COLOR_PALETTE.DRIFTWOOD,
    backgroundColor: COLOR_PALETTE.SEASHELL,
    imageTintColor: COLOR_PALETTE.DRIFTWOOD,
    textColor: COLOR_PALETTE.DRIFTWOOD,
  },
  back: {
    borderColor: COLOR_PALETTE.DRIFTWOOD,
    backgroundColor: COLOR_PALETTE.SEASHELL,
    imageTintColor: COLOR_PALETTE.DRIFTWOOD,
    textColor: COLOR_PALETTE.DRIFTWOOD,
  },
  navigate: {
    borderColor: COLOR_PALETTE.DRIFTWOOD,
    backgroundColor: COLOR_PALETTE.SEASHELL,
    imageTintColor: COLOR_PALETTE.DRIFTWOOD,
    textColor: COLOR_PALETTE.DRIFTWOOD,
  },
  draft: {
    borderColor: COLOR_PALETTE.GRAY1,
    backgroundColor: COLOR_PALETTE.GRAY1,
    imageTintColor: COLOR_PALETTE.SEASHELL,
    textColor: COLOR_PALETTE.TRANSPARENT,
  },
  share: {
    borderColor: COLOR_PALETTE.DRIFTWOOD,
    backgroundColor: COLOR_PALETTE.SEASHELL,
    imageTintColor: COLOR_PALETTE.DRIFTWOOD,
    textColor: COLOR_PALETTE.DRIFTWOOD,
  },
  backTransparent: {
    borderColor: COLOR_PALETTE.SEASHELL,
    backgroundColor: COLOR_PALETTE.TRANSPARENT,
    imageTintColor: COLOR_PALETTE.SEASHELL,
    textColor: COLOR_PALETTE.SEASHELL,
  },
};

export const darkTheme: ButtonThemes = {
  edit: {
    borderColor: COLOR_PALETTE.MIDNIGHT,
    backgroundColor: COLOR_PALETTE.MIDNIGHT,
    imageTintColor: COLOR_PALETTE.SEASHELL,
    textColor: COLOR_PALETTE.MIDNIGHT,
  },
};

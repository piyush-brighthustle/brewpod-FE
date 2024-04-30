interface CarouselDataType {
  id: string;
  initialTitle: string;
  colouredTitle?: string;
}

interface PillButtonType {
  title: string[];
  to?: string;
}

interface BrewDataType {
  screenTitle: string;
  screenSubtitle: string;
  carouselData: CarouselDataType[];
  carouselStartIndex: number;
  pillButton: PillButtonType;
}

interface BrewDataBeakerType {
  screenTitle: string;
  screenSubtitle: string;
  pillButton: PillButtonType;
  beakerBottomText?: string;
  processName: string;
}

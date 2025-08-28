import { RecyclableItem } from './index';

export type RootStackParamList = {
  Main: undefined;
  ItemDetail: { item: RecyclableItem };
};

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
};

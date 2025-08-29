import { RecyclableItem } from './index';

export type RootStackParamList = {
  Main: undefined;
  ItemDetail: { item: RecyclableItem };
  Success: undefined;
};

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
};

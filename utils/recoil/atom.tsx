import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loginStates = atom<boolean>({
  key: 'loginState',
  default: false,
});

export const userNames = atom<string>({
  key: 'userNames',
  default: '',
});

export const BottomNavbarPlusButtonState = atom<Boolean>({
  key: 'bottomNavbarPlusButtonState',
  default: false,
});

export const storedImageKey = atom<ImageWithTag | undefined>({
  key: 'storedImageKey',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

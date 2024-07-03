import { Dispatch, SetStateAction } from 'react';
import { WebViewMessageEvent } from 'react-native-webview';

interface Message {
  type: string;
  payload?: any;
}

const handleOOTD = (payload: any, setState: Dispatch<SetStateAction<any>>) => {
  const imageArray = payload.map((item: any, index: number) => ({
    ootdImage: item,
    ootdId: index,
  }));
  setState(imageArray);
};

const handleCloth = (payload: any, setState: Dispatch<SetStateAction<any>>) => {
  setState([{ ootdImage: payload[0], ootdId: 0 }]);
};

const handleProfileUpdate = (
  payload: any,
  setState: Dispatch<SetStateAction<any>>
) => {
  setState(payload[0]);
};

const handleCancel = (setState: Dispatch<SetStateAction<any>>) => {
  setState(undefined);
};

const handleShareOrCopy = (
  payload: any,
  setState: Dispatch<SetStateAction<any>>
) => {
  setState(payload === 'success');
};

const handleToken = (payload: any) => {
  const { accessToken, refreshToken } = payload;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const messageHandlers: {
  [key: string]: (
    payload: any,
    setState: Dispatch<SetStateAction<any>>
  ) => void;
} = {
  OOTD: handleOOTD,
  Cloth: handleCloth,
  TakeProfile: handleProfileUpdate,
  Profile: handleProfileUpdate,
  cancel: handleCancel,
  shareURL: handleShareOrCopy,
  copyEmail: handleShareOrCopy,
  token: handleToken,
};

export const getReactNativeMessage = (
  setState: Dispatch<SetStateAction<any>>
) => {
  const listener = (event: any) => {
    const parsedData = JSON.parse(event.data);
    const { type, payload } = parsedData;
    const handler = messageHandlers[type];

    if (handler) {
      handler(payload, setState);
    }
  };

  if (window.ReactNativeWebView) {
    document.addEventListener('message', listener); // Android
    window.addEventListener('message', listener); // iOS
  }
};

export const sendReactNativeMessage = ({ type, payload }: Message) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
  }
};

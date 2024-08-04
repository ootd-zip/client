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

    if (parsedData?.type === 'OOTD') {
      const banana = parsedData?.payload;
      const imageArray = banana.map((item: any, index: number) => {
        return { ootdImage: item, ootdId: index };
      });
      setState(imageArray);
    }
    if (parsedData?.type === 'OOTDPreview') {
      const banana = parsedData?.payload;
      const imageArray = banana.map((item: any, index: number) => {
        return { ootdImage: item, ootdId: index };
      });
      setState(imageArray);
    }
    if (parsedData!.type === 'ClothPreview') {
      const banana = parsedData?.payload;
      setState([{ ootdImage: banana[0], ootdId: 0 }]);
    }
    if (parsedData!.type === 'Cloth') {
      const banana = parsedData?.payload;
      setState([{ ootdImage: banana[0], ootdId: 0 }]);
    }
    if (parsedData!.type === 'TakeProfile') {
      const banana = parsedData?.payload;
      setState(banana[0]);
    }
    if (parsedData!.type === 'Profile') {
      const banana = parsedData?.payload;
      setState(banana[0]);
    }
    if (parsedData!.type === 'cancel') {
      setState(undefined);
    }
    if (parsedData!.type === 'shareURL') {
      const shareURLState = parsedData?.payload;
      if (shareURLState === 'success') {
        setState(true);
      } else {
        setState(false);
      }
    }
    if (parsedData!.type === 'copyEmail') {
      const shareURLState = parsedData?.payload;
      if (shareURLState === 'success') {
        setState(true);
      } else {
        setState(false);
      }
    }
    if (parsedData!.type === 'token') {
      const accessToken = parsedData?.payload.accessToken;
      const refreshToken = parsedData?.payload.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

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

import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { Dispatch, SetStateAction } from 'react';
import { WebViewMessageEvent } from 'react-native-webview';
interface Message {
  type: string;
  payload?: any;
}
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
    }
  };
  if (window.ReactNativeWebView) {
    //android
    document.addEventListener('message', listener);
    // //ios
    window.addEventListener('message', listener);
  }
};
export const sendReactNativeMessage = ({ type, payload }: Message) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
  }
};

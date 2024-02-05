import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { Dispatch, SetStateAction } from 'react';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

interface Message {
  type: string;
  payload?: any;
}

export const getReactNativeMessage = (
  setState: Dispatch<SetStateAction<ImageWithTag | undefined>>
) => {
  const listener = (event: WebViewMessageEvent) => {
    const parsedData = JSON.parse(event.data);
    if (parsedData?.type === 'OOTD') {
      const banana = parsedData?.payload;
      const imageArray = banana.map((item: any, index: number) => {
        return { ootdImage: item, ootdId: index };
      });
      setState(imageArray);
    }
    if (parsedData!.type === 'Cloth') {
      const banana = parsedData?.payload;
      setState([{ ootdImage: banana[0], ootdId: 0 }]);
    }
    if (parsedData!.type === 'cancel') {
      setState(undefined);
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

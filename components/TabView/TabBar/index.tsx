import { Body2, Body3, Caption1 } from '@/components/UI';
import { Layout, Tab, Hr } from './style';
import { useTabViewContext } from '@/hooks/use-tabview/context';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';
interface TabBarProps {
  count?: number[];
  tab: string[];
  display: 'inline' | 'block';
  className?: string;
  onChangeState?: () => void;
}

export default function TabBar({
  count,
  tab,
  display,
  className,
  onChangeState,
}: TabBarProps) {
  const { index, setIndex } = useTabViewContext();

  //props로 전달받은 tab의 개수만큼 유동적으로 초깃값 관리
  const firstState = new Array(tab.length - 1).fill(false);

  const [state, setState] = useState([true, ...firstState]);

  //처음엔 onChangeState가 일어나지 않게 하기 위한 상태
  const [onChangeFirstState, setOnChangeFirstState] = useState<number>(0);

  const handleTabClick = (currentIndex: number) => {
    setIndex(currentIndex);
  };

  useEffect(() => {
    const newArray = new Array(tab.length).fill(false);
    newArray[index - 1] = true;
    setState(newArray);
    setOnChangeFirstState(onChangeFirstState + 1);
  }, [index, tab.length]);

  // 검색어 초기화
  useEffect(() => {
    if (onChangeFirstState >= 2) {
      onChangeState?.();
    }
  }, [state]);

  return (
    <>
      <Layout className={className}>
        {tab.map((item, index) => {
          return (
            <Tab
              display={display}
              key={index}
              focus={state[index]}
              onClick={() => handleTabClick(index + 1)}
            >
              {count && count.length > 0 ? (
                <Body2 state="emphasis">
                  {count && count[index]}
                  <br />
                  {item}
                </Body2>
              ) : (
                <Body2 state="emphasis">{item}</Body2>
              )}
            </Tab>
          );
        })}
      </Layout>
      <Hr />
    </>
  );
}

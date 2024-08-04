import { Body2 } from '@/components/UI';
import { Layout, Tab, Hr } from './style';
import { useTabViewContext } from '@/hooks/use-tabview/context';
import { useEffect, useState } from 'react';
interface TabBarProps {
  count?: number[];
  tab: string[];
  display: 'inline' | 'block';
  className?: string;
  onChangeState?: () => void;
}
/*
이름: 탭바
역할: 탭뷰의 클릭으로 각 탭으로 이동할 수 있고, 현재 인덱스를 알려주는 탭바 컴포넌트
*/
export default function TabBar({
  count,
  tab,
  display,
  className,
  onChangeState,
}: TabBarProps) {
  //탭뷰의 인덱스를 contextApi를 사용해 탭과 탭뷰가 동시에 관리
  const { index, setIndex } = useTabViewContext();

  //props로 전달받은 tab의 개수만큼 유동적으로 초깃값 관리
  const firstState = new Array(tab.length - 1).fill(false);

  //탭 바 인덱스의 상태
  const [state, setState] = useState([true, ...firstState]);

  //처음엔 onChangeState가 일어나지 않게 하기 위한 상태
  const [onChangeFirstState, setOnChangeFirstState] = useState<number>(0);

  const handleTabClick = (currentIndex: number) => {
    setIndex(currentIndex);
  };

  //인덱스가 변경되면 해당 인덱스를 true로 변경
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

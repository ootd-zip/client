import React from 'react';
import { ToggleLayout, ToggleContainer, ToggleCircle } from './style';

interface ToggleInterface {
  state: Boolean;
  setState: React.Dispatch<React.SetStateAction<Boolean>>;
}
/*
이름: 스위치 토글
역할: 누르면 좌 우로 이동하며 꺼지고 켜지는 스위치 토글
*/
export default function SwitchToggle(props: ToggleInterface) {
  const onClickToggleButton = () => {
    props.setState(!props.state);
  };

  return (
    <ToggleLayout onClick={onClickToggleButton}>
      <ToggleContainer state={props.state} />
      <ToggleCircle state={props.state} />
    </ToggleLayout>
  );
}

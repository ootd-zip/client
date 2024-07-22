import { Dispatch, SetStateAction } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { LikeToggleLayout } from './style';

interface LikeToggleProps {
  state: Boolean;
  setState: Dispatch<SetStateAction<Boolean>>;
  onClick: () => void;
}
/*
이름: 좋아요 토글
역할: 누르면 바전되는 좋아요 버튼 토글
*/
export default function LikeToggle({
  state,
  setState,
  onClick,
}: LikeToggleProps) {
  const onClickLikeButton = () => {
    onClick();
    setState(!state);
  };

  return (
    <LikeToggleLayout>
      {state && (
        <AiFillHeart onClick={onClickLikeButton} style={{ color: 'red' }} />
      )}
      {!state && <AiOutlineHeart onClick={onClickLikeButton} />}
    </LikeToggleLayout>
  );
}

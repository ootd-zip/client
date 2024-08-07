import { Body3, Title1 } from '@/components/UI';
import S from './style';
import Input from '@/components/Input';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import Modal from '@/components/Modal';
import NextButton from '@/components/NextButton';
import { ClothWhereBuy } from '@/pages/add-cloth';
import { AiOutlineClose } from 'react-icons/ai';

interface WhereToBuyModal {
  storedClothWhereBuy?: ClothWhereBuy;
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<Boolean>>;
  setWhereToBuy: Dispatch<SetStateAction<ClothWhereBuy>>;
}

/*
이름: 구매처 모달
역할: 옷 등록 시 사용되는 구매처 모달 컴포넌트
특이사항: default는 둘 다 선택 가능한 모습, 한쪽 선택 시 다른쪽 인풋을 disable
*/
export default function WhereToBuyModal({
  storedClothWhereBuy,
  isOpen,
  setIsOpen,
  setWhereToBuy,
}: WhereToBuyModal) {
  //링크 입력 input
  const [linkLetter, setLinkLetter] = useState<string>(
    storedClothWhereBuy && storedClothWhereBuy.type === 'Link'
      ? storedClothWhereBuy.letter
      : ''
  );
  //직접 입력 input
  const [writeLetter, setWriteLetter] = useState<string>(
    storedClothWhereBuy && storedClothWhereBuy.type === 'Write'
      ? storedClothWhereBuy.letter
      : ''
  );

  //직접 입력인지 링크 입력인지 구분하기 위한 상태 링크라면 1
  const [selectedLetter, setSelectedLetter] = useState<number | null>(
    storedClothWhereBuy && storedClothWhereBuy.type === 'Link' ? 1 : 2
  );

  const [onClickInputState, setOnClickInputState] = useState<Boolean>(false);

  const linkRef = useRef<any>(null);
  const writeRef = useRef<any>(null);

  //링크 인풋 클릭 함수
  const onClickLinkLetter = () => {
    setSelectedLetter(1);
    setWriteLetter('');
    setOnClickInputState(true);
  };

  //직접 입력 인풋 클릭 함수
  const onClickWriteLetter = () => {
    setSelectedLetter(2);
    setLinkLetter('');
    setOnClickInputState(true);
  };

  //다음 단계 버튼 클릭 함수
  const onClickNextButton = () => {
    setIsOpen(false);
    if (linkLetter.length > 0)
      setWhereToBuy({ letter: linkLetter, type: 'Link' });
    if (writeLetter.length > 0)
      setWhereToBuy({ letter: writeLetter, type: 'Write' });
  };

  return (
    <Modal height="70" isOpen={isOpen}>
      <S.Layout>
        <S.Main>
          <S.Title>
            <Title1 className="title">구매처</Title1>
            <AiOutlineClose
              onClick={() => setIsOpen(false)}
              className="close"
            />
          </S.Title>
          <S.Link>
            <Body3>링크로 입력하기</Body3>
            <Input>
              {selectedLetter === 0 ||
              selectedLetter === 1 ||
              !onClickInputState ? (
                <Input.Text
                  defaultValue={linkLetter}
                  inputRef={linkRef}
                  size="big"
                  placeholder="링크를 붙여넣으세요."
                  line="outline"
                  type="Link"
                  onChange={setLinkLetter}
                  onClick={onClickLinkLetter}
                  state={true}
                />
              ) : (
                <Input.ReadOnly
                  state={false}
                  result={<Body3>{linkLetter}</Body3>}
                  type="Link"
                  onClick={onClickLinkLetter}
                />
              )}
            </Input>
          </S.Link>
          <S.Write>
            <Body3>직접 입력하기</Body3>
            <Input>
              {selectedLetter === 0 ||
              selectedLetter === 2 ||
              !onClickInputState ? (
                <Input.Text
                  defaultValue={writeLetter}
                  inputRef={writeRef}
                  size="big"
                  placeholder="선물 받았어요, 래플 당첨 등"
                  line="outline"
                  onChange={setWriteLetter}
                  onClick={onClickWriteLetter}
                  state={true}
                />
              ) : (
                <Input.ReadOnly
                  state={false}
                  result={<Body3>{writeLetter}</Body3>}
                  onClick={onClickWriteLetter}
                />
              )}
            </Input>
          </S.Write>
        </S.Main>
        <NextButton
          className="nextButton"
          onClick={onClickNextButton}
          state={linkLetter.length > 0 || writeLetter.length > 0}
        >
          추가하기
        </NextButton>
      </S.Layout>
    </Modal>
  );
}

import { Body3 } from '@/components/UI';
import S from './style';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { Dispatch, SetStateAction } from 'react';
import Input from '@/components/Input';
import { Style } from '@/pages/AddOOTD';
import NextButton from '@/components/NextButton';
import Modal from '@/components/Modal';

interface StyleModalProps {
  setAddTag: Dispatch<SetStateAction<Boolean>>;
  addTag: Boolean;
  style: Style[];
  setStyle: Dispatch<SetStateAction<Style[]>>;
  setSelectedStyle: Dispatch<SetStateAction<string[]>>;
}

export default function StyleModal({
  setAddTag,
  addTag,
  style,
  setStyle,
  setSelectedStyle,
}: StyleModalProps) {
  //스타일 선택 완료 버튼
  const onClickStyleCompleteButton = () => {
    const selectedStyle = style
      .filter((item) => item.value)
      .map((item) => item.tag);
    setSelectedStyle(selectedStyle);
    setAddTag(false);
  };
  return (
    <>
      <S.Background addTag={addTag} onClick={() => setAddTag(false)} />

      <Modal height="80" isOpen={addTag}>
        <S.Layout>
          <S.Dragger>
            <S.DraggerBar />
          </S.Dragger>
          <S.Label>
            <Body3>스타일 태그</Body3>
            <AiOutlineArrowDown onClick={() => setAddTag(false)} />
          </S.Label>
          <S.CheckBox>
            <Input>
              <Input.CheckBox state={style} setState={setStyle} />
              <Input.HelperText state={1}>
                최소 1개 이상 선택해주세요
              </Input.HelperText>
            </Input>
          </S.CheckBox>
          <NextButton
            state={style.length > 0}
            onClick={onClickStyleCompleteButton}
          >
            선택완료
          </NextButton>
        </S.Layout>
      </Modal>
    </>
  );
}

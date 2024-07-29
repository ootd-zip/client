import { Title1 } from '@/components/UI';
import S from './style';
import { AiOutlineClose } from 'react-icons/ai';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from '@/components/Input';
import { Style } from '@/pages/add-ootd';
import NextButton from '@/components/NextButton';
import Modal from '@/components/Modal';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';

interface StyleModalProps {
  setStyleModalIsOpen: Dispatch<SetStateAction<Boolean>>;
  styleModalIsOpen: Boolean;
  setSelectedStyle: Dispatch<SetStateAction<Style[]>>;
  styleInitial?: Style[];
}
/*
이름: 스타일 선택 모달
역할: ootd 등록 시 사용되는 스타일 선택 모달
*/
export default function StyleModal({
  setStyleModalIsOpen,
  styleModalIsOpen,
  setSelectedStyle,
  styleInitial,
}: StyleModalProps) {
  //스타일
  const [style, setStyle] = useState<Style[]>([]);
  //선택된 스타일
  const [selectedStyle, setSelectedStyleStyle] = useState<Style[]>();

  const { getStyle } = OOTDApi();

  //스타일 조회 api 호출 및 기존에 선택된 스타일 업데이트
  useEffect(() => {
    const ferchData = async () => {
      let result = (await getStyle()).map((item: Style) => {
        return { ...item, state: false };
      }) as Style[];

      if (styleInitial) {
        styleInitial.forEach((style) => {
          const styleIndex = result.findIndex((item) => item.id === style.id);
          if (styleIndex !== -1) {
            result[styleIndex].state = true;
          }
        });
      }
      setStyle(result);
    };

    ferchData();
  }, []);

  //스타일 선택 완료 버튼
  const onClickStyleCompleteButton = () => {
    if (style) {
      const selectedStyle = style.filter((item) => item.state);
      setSelectedStyle(selectedStyle);
      setStyleModalIsOpen(false);
    }
  };

  //스타일 상태 변화 시 선택된 스타일 상태 업데이트
  useEffect(() => {
    setSelectedStyleStyle(style.filter((item) => item.state));
  }, [style]);

  return (
    <>
      <Modal height="70" isOpen={styleModalIsOpen}>
        <S.Layout>
          <S.Label>
            <Title1>스타일 태그</Title1>
            <AiOutlineClose onClick={() => setStyleModalIsOpen(false)} />
          </S.Label>
          <S.CheckBox>
            <Input>
              <Input.CheckBox state={style!} setState={setStyle} />
              {selectedStyle && selectedStyle.length === 0 && (
                <Input.HelperText className="helperText" state={2}>
                  최소 1개 이상 선택해주세요
                </Input.HelperText>
              )}
            </Input>
          </S.CheckBox>
          <NextButton
            className="nextButton"
            state={!(selectedStyle !== undefined && selectedStyle.length === 0)}
            onClick={onClickStyleCompleteButton}
          >
            선택완료
          </NextButton>
        </S.Layout>
      </Modal>
    </>
  );
}

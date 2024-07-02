import { Headline2 } from '@/components/UI';
import S from '@/pageStyle/add-cloth/ClothName/style';
import Input from '@/components/Input';
import { Dispatch, SetStateAction } from 'react';
import { ImageWithTag } from '@/utils/types/OOTD.types';
import NextButton from '@/components/NextButton';
import NextImage from '@/components/NextImage';
import Portal from '@/components/Portal';

interface ClothNameProps {
  clothImage: ImageWithTag;
  clothName: string;
  setClothName: Dispatch<SetStateAction<string>>;
  handleStep: (next: string) => void;
}

export default function ClothName({
  clothImage,
  clothName,
  setClothName,
  handleStep,
}: ClothNameProps) {
  return (
    <S.Layout>
      <S.Main>
        <Headline2 className="title">이 옷을</Headline2>
        <Headline2>어떻게 부를까요?</Headline2>
        <S.Image>
          <NextImage
            fill={true}
            src={clothImage && clothImage[0].ootdImage}
            alt="선택된 옷"
          />
        </S.Image>
        <Input>
          <Input.Text
            placeholder="제품명을 입력해주세요."
            line="underline"
            onChange={setClothName}
            size="big"
          />
          <Input.HelperText state={1} className="helperText">
            옷의 태그를 확인하면 더 정확하게 적을 수 있어요.
          </Input.HelperText>
        </Input>
      </S.Main>

      <NextButton
        className="nextButton"
        onClick={() => handleStep('기본정보1')}
        state={clothName?.length > 0}
      >
        다음
      </NextButton>
    </S.Layout>
  );
}

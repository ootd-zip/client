import { Body2, Body3, Headline1, Title1 } from '@/components/UI';
import Input from '@/components/Input';
import { Dispatch, SetStateAction } from 'react';
import NextButton from '@/components/NextButton';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import { BrandType } from '@/components/BrandList/Brand';
import S from '@/pageStyle/add-cloth/AdditionalInfo/style';
import NextImage from '@/components/NextImage';

interface AdditionalInfo {
  clothName: string;
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: BrandType[] | null;
  clothMemo: string;
  setClothMemo: Dispatch<SetStateAction<string>>;
  setClothBuyDate: Dispatch<SetStateAction<string>>;
  onClickSubmitButton: () => void;
}
/*
이름: 옷 등록 추가 정보 
*/
export default function AdditionalInfo({
  clothName,
  clothImage,
  clothCategory,
  clothBrand,
  clothMemo,
  setClothMemo,
  onClickSubmitButton,
  setClothBuyDate,
}: AdditionalInfo) {
  //카테고리 컴포넌트
  const Category = () => {
    return (
      <S.Category>
        <Body3>{clothCategory && clothCategory[0]?.name}</Body3>
        <Body3>&gt;</Body3>
        <Body3 style={{ fontWeight: '700' }}>
          {clothCategory &&
            clothCategory[0]?.detailCategories &&
            clothCategory[0]?.detailCategories[0].name}
        </Body3>
      </S.Category>
    );
  };

  return (
    <S.Layout>
      <S.Main>
        {/*이전 선택 값들*/}
        <S.BasicInfoFirst>
          <Category />
          <Headline1>{clothBrand && clothBrand[0].name}</Headline1>
          <Body2 className="name">{clothName}</Body2>
          <NextImage
            fill={false}
            width={106}
            height={106}
            src={clothImage! && clothImage![0].ootdImage}
            alt=""
          />
          <hr />
        </S.BasicInfoFirst>
        {/*추가 정보*/}
        <S.AdditionalInfo>
          <S.Title>
            <Title1 className="title">추가 정보</Title1>
          </S.Title>
          <S.Information>
            <Input>
              <Input.Label size="small" className="label">
                구매시기
              </Input.Label>
              <Input.Text
                size="big"
                placeholder=""
                border={true}
                onChange={setClothBuyDate}
                line="outline"
                state={true}
              />
            </Input>
            <Input>
              <Input.Label size="small" className="label">
                메모
              </Input.Label>
              <Input.TextArea
                input={clothMemo}
                setInput={setClothMemo}
                placeholder=""
              />
            </Input>
          </S.Information>
        </S.AdditionalInfo>
      </S.Main>
      {/*등록 완료 버튼*/}
      <NextButton
        state={true}
        onClick={onClickSubmitButton}
        className="nextButton"
      >
        등록하기
      </NextButton>
    </S.Layout>
  );
}

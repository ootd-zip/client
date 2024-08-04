import { Body2, Body3, Headline1, Title1 } from '@/components/UI';
import Input from '@/components/Input';
import { Dispatch, SetStateAction, useState } from 'react';
import NextButton from '@/components/NextButton';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import { BrandType } from '@/components/BrandList/Brand';
import S from '@/pageStyle/add-cloth/AdditionalInfo/style';
import NextImage from '@/components/NextImage';
import { ClothWhereBuy } from '..';
import WhereToBuyModal from '@/components/Domain/AddCloth/WhereToBuyModal';
import Background from '@/components/Background';
import ClothSizeModal, {
  SizeItem,
} from '@/components/Domain/AddCloth/ClothSizeModal';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';

interface AdditionalInfo {
  clothName: string;
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: BrandType[] | null;
  clothMemo: string;
  clothWhereBuy: ClothWhereBuy;
  clothSize: SizeItem | null;
  setClothMemo: Dispatch<SetStateAction<string>>;
  setClothBuyDate: Dispatch<SetStateAction<string>>;
  setClothWhereBuy: Dispatch<SetStateAction<ClothWhereBuy>>;
  setClothSize: Dispatch<SetStateAction<SizeItem | null>>;
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
  clothWhereBuy,
  clothSize,
  setClothMemo,
  onClickSubmitButton,
  setClothBuyDate,
  setClothWhereBuy,
  setClothSize,
}: AdditionalInfo) {
  const [sizeModalOpen, setSizeModalOpen] = useState<Boolean>(false);

  const [whereToBuyModalOpen, setWhereToBuyModalOpen] =
    useState<Boolean>(false);

  const WhereToBuy = clothWhereBuy && (
    <Body3
      style={{
        WebkitTextDecorationLine:
          clothWhereBuy.type === 'Link' ? 'underline' : 'none',
      }}
    >
      {clothWhereBuy?.letter}
    </Body3>
  );

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

  const onClickBackground = () => {
    if (whereToBuyModalOpen) setWhereToBuyModalOpen(false);
    if (sizeModalOpen) setSizeModalOpen(false);
  };
  return (
    <>
      <Background
        isOpen={whereToBuyModalOpen || sizeModalOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        <S.Main>
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
          <S.AdditionalInfo>
            <S.Title>
              <Title1 className="title">추가 정보</Title1>
            </S.Title>
            <S.Information>
              <Input>
                <Input.Label size="small" className="label">
                  사이즈
                </Input.Label>
                <Input.Modal
                  result={<Body3>{clothSize?.name}</Body3>}
                  setModalOpen={setSizeModalOpen}
                  state={clothSize !== null}
                />
              </Input>
              <Input>
                <Input.Label size="small" className="label">
                  구매처
                </Input.Label>
                {clothWhereBuy ? (
                  <Input.Modal
                    result={WhereToBuy}
                    setModalOpen={setWhereToBuyModalOpen}
                    state={clothWhereBuy?.letter.length > 0}
                    type={clothWhereBuy.type}
                  />
                ) : (
                  <Input.Modal
                    result={WhereToBuy}
                    setModalOpen={setWhereToBuyModalOpen}
                    state={true}
                  />
                )}
              </Input>
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
        <NextButton
          state={true}
          onClick={onClickSubmitButton}
          className="nextButton"
        >
          등록하기
        </NextButton>
        {sizeModalOpen && (
          <ClothSizeModal
            setIsOpen={setSizeModalOpen}
            setClothSize={setClothSize}
            isOpen={sizeModalOpen}
            categoryId={
              clothCategory![0].state
                ? clothCategory![0].id
                : clothCategory![0].detailCategories![0].id
            }
            clothSizeInitial={clothSize}
          />
        )}
        {whereToBuyModalOpen && (
          <WhereToBuyModal
            isOpen={whereToBuyModalOpen}
            setIsOpen={setWhereToBuyModalOpen}
            setWhereToBuy={setClothWhereBuy}
            storedClothWhereBuy={clothWhereBuy}
          />
        )}
      </S.Layout>
    </>
  );
}

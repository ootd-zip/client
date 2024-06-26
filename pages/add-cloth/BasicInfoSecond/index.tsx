import { Body2, Body3, Headline1, Headline2, Title1 } from '@/components/UI';
import S from '@/pageStyle/add-cloth/BasicInfoSecond/style';
import { Dispatch, SetStateAction, useState } from 'react';
import Input from '@/components/Input';
import NextButton from '@/components/NextButton';
import PlusButton from '@/components/PlusButton';
import { ColorListType } from '@/utils/types/OOTD.types';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import ColorSpan from '@/components/ColorList/ColorSpan';
import ColorModal from '@/components/Domain/AddCloth/ColorModal';
import ClothSizeModal, {
  SizeItem,
} from '@/components/Domain/AddCloth/ClothSizeModal';
import AddClothAlert from '@/components/Domain/AddCloth/AddClothAlert';
import { BrandType } from '@/utils/types/OOTD.types';
import { ClothWhereBuy } from '..';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import NextImage from '@/components/NextImage';
import Background from '@/components/Background';
import useRememberScroll from '@/hooks/useRememberScroll';

interface BasicInfoSecondProps {
  clothName: string;
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: BrandType[] | null;
  clothWhereBuy: ClothWhereBuy;
  open: Boolean;
  handleStep: (next: string) => void;
  clothColor: ColorListType | null;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
  clothSize: SizeItem | null;
  setClothSize: Dispatch<SetStateAction<SizeItem | null>>;
  setOpen: Dispatch<SetStateAction<Boolean>>;
  onClickSubmitButton: () => void;
}

export default function BasicInfoSecond({
  clothName,
  clothCategory,
  clothBrand,
  clothImage,
  clothColor,
  clothWhereBuy,
  setClothColor,
  clothSize,
  setClothSize,
  setOpen,
  open,
  handleStep,
  onClickSubmitButton,
}: BasicInfoSecondProps) {
  const [colorModalOpen, setColorModalOpen] = useState<Boolean>(false);
  const [sizeModalOpen, setSizeModalOpen] = useState<Boolean>(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);

  const { postCloth } = ClothApi();
  const router = useRouter();
  const myId = useRecoilValue(userId);

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
    if (colorModalOpen) setColorModalOpen(false);
    if (sizeModalOpen) setSizeModalOpen(false);
    if (alertOpen) setAlertOpen(false);
  };

  const onClickNextButton = () => {
    setAlertOpen(true);
  };

  const onClickColorPlusButton = () => {
    setColorModalOpen(true);
  };

  const onClickYesButton = () => {
    handleStep('추가정보');
  };

  const { reset } = useRememberScroll({ key: `mypage-${myId}-cloth` });

  const onClickNoButton = async () => {
    const payload = {
      purchaseStore: clothWhereBuy.letter,
      purchaseStoreType: clothWhereBuy.type,
      brandId: clothBrand![0].id,
      categoryId: clothCategory![0].detailCategories![0].id,
      colorIds: [...clothColor!].map((item) => item.id),
      isPrivate: !open,
      sizeId: clothSize!.id,
      clothesImageUrl: clothImage![0].ootdImage,
      name: clothName,
    };

    const result = await postCloth(payload);

    if (result) {
      reset();
      router.replace(`/mypage/${myId}`);
    }
  };

  return (
    <>
      <Background
        isOpen={colorModalOpen || sizeModalOpen || alertOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        <S.BasicInfoFirst>
          <Category />
          <Headline1>{clothBrand && clothBrand[0].name}</Headline1>
          <Body2 className="name">{clothName}</Body2>
          <NextImage
            width={106}
            height={106}
            fill={false}
            src={clothImage! && clothImage[0].ootdImage}
            alt=""
          />
          <hr />
        </S.BasicInfoFirst>
        <S.BasicInfoSecond>
          <S.Title>
            <Title1 className="title">기본 정보</Title1>
          </S.Title>
          <S.Information>
            <Input>
              <Input.Label size="small" className="label">
                색상
              </Input.Label>
              <S.ClothColorSpanList>
                {clothColor &&
                  clothColor.map((item, index) => {
                    return (
                      <ColorSpan
                        key={index}
                        index={index}
                        color={item.colorCode}
                        name={item.name}
                        state={false}
                      />
                    );
                  })}
                <PlusButton onClickPlusButton={onClickColorPlusButton} />
              </S.ClothColorSpanList>
            </Input>

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
                공개 여부
              </Input.Label>
              <Input.TrueFalse
                left="공개"
                right="비공개"
                state={open}
                setState={setOpen}
              />
              <Input.HelperText className="helpertext" state={1}>
                공개로 설정하면 다른사람과 아이템을 공유할 수 있어요.
              </Input.HelperText>
            </Input>
          </S.Information>
        </S.BasicInfoSecond>
        <NextButton
          state={
            clothColor !== null && clothColor?.length > 0 && clothSize !== null
          }
          onClick={onClickNextButton}
          className="nextButton"
        >
          등록하기
        </NextButton>
      </S.Layout>
      {colorModalOpen && (
        <ColorModal
          colorInitial={clothColor}
          setIsOpen={setColorModalOpen}
          setClothColor={setClothColor}
          isOpen={colorModalOpen}
        />
      )}
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
      {alertOpen && (
        <AddClothAlert
          onClickYesButton={onClickYesButton}
          onClickNoButton={onClickNoButton}
        />
      )}
    </>
  );
}

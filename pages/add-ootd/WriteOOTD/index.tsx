import Input from '@/components/Input';
import S from '@/pageStyle/add-ootd/WriteOOTD/style';
import { Dispatch, SetStateAction, useState } from 'react';
import { Body4, Button3, Title1 } from '@/components/UI';
import { AiOutlinePlus } from 'react-icons/ai';
import { Style } from '..';
import { AiOutlineClose } from 'react-icons/ai';
import { ImageWithTag } from '@/utils/types/OOTD.types';
import StyleModal from '@/components/Domain/AddOOTD/StyleModal';
import NextButton from '@/components/NextButton';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import NextImage from '@/components/NextImage';
import Background from '@/components/Background';
import useRememberScroll from '@/hooks/useRememberScroll';

interface WriteOOTDProps {
  imageAndTag: ImageWithTag | undefined;
  string: string;
  setString: Dispatch<SetStateAction<string>>;
  open: Boolean;
  setOpen: Dispatch<SetStateAction<Boolean>>;
  selectedStyle: Style[];
  setSelectedStyle: Dispatch<SetStateAction<Style[]>>;
  complete: Boolean;
}

export default function WriteOOTD({
  imageAndTag,
  string,
  setString,
  open,
  setOpen,
  selectedStyle,
  setSelectedStyle,
  complete,
}: WriteOOTDProps) {
  const { postOOTD } = OOTDApi();
  const myId = useRecoilValue(userId);
  const router = useRouter();

  const [styleModalIsOpen, setStyleModalIsOpen] = useState<Boolean>(false);

  const onClickAddStyleTag = () => {
    setStyleModalIsOpen(true);
  };

  const onClickStyleTag = (index: number) => {
    const sampleSelectedStyleTag = [...selectedStyle];
    sampleSelectedStyleTag.splice(index, 1);
    setSelectedStyle(sampleSelectedStyleTag);
  };

  const { reset } = useRememberScroll({ key: `mypage-${myId}-ootd` });

  const onClickSubmitButton = async () => {
    if (imageAndTag !== undefined) {
      const payload = {
        content: string,
        isPrivate: !open as Boolean,
        styles: selectedStyle.map((item) => item.id),
        ootdImages: imageAndTag.map((ootd) => {
          return {
            ootdImage: ootd.ootdImage,
            clothesTags: ootd.ootdImageClothesList
              ? ootd.ootdImageClothesList?.map((tag) => {
                  return {
                    clothesId: tag.clothesId,
                    deviceWidth: tag.deviceSize.deviceWidth,
                    deviceHeight: tag.deviceSize.deviceHeight,
                    xrate: tag.coordinate.xrate,
                    yrate: tag.coordinate.yrate,
                  };
                })
              : [],
          };
        }),
      };
      const addOOTDSuccess = await postOOTD(payload);

      //ootd 성공 여부에 따른 페이지 이동
      if (addOOTDSuccess) {
        reset();
        router.replace(`/mypage/${myId}`);
      } else {
        alert('등록 실패');
      }
    }
  };
  return (
    <>
      <Background
        onClick={() => setStyleModalIsOpen(false)}
        isOpen={styleModalIsOpen}
      />
      <S.Layout>
        <Body4 className="selectedPhoto" state="emphasis">
          {imageAndTag !== undefined && imageAndTag!.length}장의 사진이 선택됨
        </Body4>
        <S.OOTDImage>
          {imageAndTag &&
            imageAndTag.map((item, index) => {
              return (
                <NextImage
                  fill={false}
                  width={106}
                  height={106}
                  src={item.ootdImage}
                  key={index}
                  alt=""
                />
              );
            })}
        </S.OOTDImage>
        <S.ImageDivider />
        <S.Text>
          <Input>
            <Input.TextArea
              input={string}
              setInput={setString}
              placeholder="OOTD에 대해 설명해주세요."
            />
          </Input>
        </S.Text>
        <S.Style>
          <Title1>스타일태그</Title1>
          <AiOutlinePlus onClick={onClickAddStyleTag} />
        </S.Style>
        <S.StyleList>
          {selectedStyle?.length > 0 &&
            selectedStyle?.map((item, index) => {
              return (
                <S.StyleListSpan
                  onClick={() => onClickStyleTag(index)}
                  key={index}
                >
                  <Button3 className="selectedStyleList">{item.name}</Button3>
                  <AiOutlineClose />
                </S.StyleListSpan>
              );
            })}
        </S.StyleList>
        <S.Open>
          <Title1>공개여부</Title1>
          <Input>
            <Input.TrueFalse
              left="공개"
              right="비공개"
              state={open}
              setState={setOpen}
            />
          </Input>
        </S.Open>
        <NextButton
          className="nextButon"
          state={complete}
          onClick={onClickSubmitButton}
        >
          작성 완료
        </NextButton>
      </S.Layout>
      {styleModalIsOpen && (
        <StyleModal
          setStyleModalIsOpen={setStyleModalIsOpen}
          setSelectedStyle={setSelectedStyle}
          styleModalIsOpen={styleModalIsOpen}
        />
      )}
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import Input from '@/components/Input';
import S from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { Body4, Button3, Title1 } from '@/components/UI';
import { AiOutlinePlus } from 'react-icons/ai';
import { Style } from '..';
import { AiOutlineClose } from 'react-icons/ai';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import StyleModal from '@/components/Domain/AddOOTD/StyleModal';
import NextButton from '@/components/NextButton';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';

interface WriteOOTDProps {
  imageAndTag: ImageWithTag | string;
  string: string;
  setString: Dispatch<SetStateAction<string>>;
  style: Style[];
  setStyle: Dispatch<SetStateAction<Style[]>>;
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  selectedStyle: string[];
  setSelectedStyle: Dispatch<SetStateAction<string[]>>;
  complete: Boolean;
}

export default function WriteOOTD({
  imageAndTag,
  string,
  setString,
  style,
  setStyle,
  open,
  setOpen,
  selectedStyle,
  setSelectedStyle,
  complete,
}: WriteOOTDProps) {
  const [postOOTD] = OOTDApi();

  const [addTag, setAddTag] = useState<Boolean>(false);
  const [init, setInit] = useState<Boolean>(false); // 초기 addTag 렌더링 방지

  const onClickAddStyleTag = () => {
    setAddTag(true);
    setInit(true);
  };

  const onClickStyleTag = (index: number) => {
    const sampleSelectedStyleTag = [...selectedStyle];
    sampleSelectedStyleTag.splice(index, 1);
    setSelectedStyle(sampleSelectedStyleTag);
  };

  const onClickSubmitButton = async () => {
    if (typeof imageAndTag !== 'string') {
      const payload = {
        content: string,
        isPrivate: true as Boolean,
        styles: [1],
        ootdImages: imageAndTag!.map((ootd) => {
          return {
            ootdImage: ootd.ootdImage,
            clothesTags: ootd.tag
              ? ootd.tag?.map((tag) => {
                  return {
                    clothesId: tag.clothId,
                    deviceWidth: tag.deviceWidth,
                    deviceHeight: tag.deviceHeight,
                    xrate: tag.xRate,
                    yrate: tag.yRate,
                  };
                })
              : [],
          };
        }),
      };
      const addOOTDSuccess = await postOOTD(payload);

      //ootd 성공 여부에 따른 페이지 이동
      if (addOOTDSuccess) {
        alert('등록 성공!');
      } else {
        alert('등록 실패');
      }
    }
  };
  return (
    <>
      <S.Layout>
        <Body4 className="selectedPhoto" state="emphasis">
          {imageAndTag.length}장의 사진이 선택됨
        </Body4>
        <S.OOTDImage>
          {typeof imageAndTag !== 'string' &&
            imageAndTag.map((item, index) => {
              return <img src={item.ootdImage} key={index} alt="" />;
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
          {selectedStyle.map((item, index) => {
            return (
              <S.StyleListSpan
                onClick={() => onClickStyleTag(index)}
                key={index}
              >
                <Button3 className="selectedStyleList">{item}</Button3>
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
        <NextButton className="nextButon" state={complete} onClick={() => ''}>
          다음
        </NextButton>
      </S.Layout>

      {init && (
        <StyleModal
          setAddTag={setAddTag}
          addTag={addTag}
          style={style}
          setStyle={setStyle}
          setSelectedStyle={setSelectedStyle}
        />
      )}
    </>
  );
}

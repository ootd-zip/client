import AppBar from '@/components/Appbar';
import StyleModal from '@/components/Domain/AddOOTD/StyleModal';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import Input from '@/components/Input';
import NextButton from '@/components/NextButton';
import { Body3, Body4, Button3, Title1 } from '@/components/UI';
import S from '@/pageStyle/edit-ootd/style';
import { useEffect, useState } from 'react';
import {
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlinePlus,
} from 'react-icons/ai';
import { Style } from '../add-ootd';
import { AppLayoutProps } from '@/AppLayout';
import { ComponentWithLayout } from '../sign-up';
import { useRouter } from 'next/router';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import NextImage from '@/components/NextImage';
import Alert from '@/components/Alert';
import Background from '@/components/Background';

/*
이름: ootd 수정 페이지 
*/
const EditOOTD: ComponentWithLayout = () => {
  //ootd 이미지
  const [imageAndTag, setImageAndTag] = useState<ImageWithTag | undefined>(
    undefined
  );
  //ootd 본문
  const [contents, setContents] = useState<string>('');
  //스타일 모달 렌더링 여부
  const [styleModalIsOpen, setStyleModalIsOpen] = useState<Boolean>(false);
  //선택된 스타일 리스트
  const [selectedStyle, setSelectedStyle] = useState<Style[]>([]);
  //옷 공개여부
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const router = useRouter();

  const [deleteImageAlertIndex, setDeleteImageAlertIndex] = useState<number>(0);

  const { getOOTDDetail, putOOTD } = OOTDApi();

  //ootd 상세 페이지 정보 조회 api
  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      const result = await getOOTDDetail(Number(router.query.OOTDNumber![0]));
      setImageAndTag(result.ootdImages);
      setContents(result.contents);
      setSelectedStyle(result.styles);
      setIsOpen(!result.private);
    };
    fetchData();
  }, [router.isReady]);

  //스타일 태그 추가 버튼 클릭 함수
  const onClickAddStyleTag = () => {
    setStyleModalIsOpen(true);
  };

  //스타일 태그 클릭 함수
  const onClickStyleTag = (index: number) => {
    const sampleSelectedStyleTag = [...selectedStyle];
    sampleSelectedStyleTag.splice(index, 1);
    setSelectedStyle(sampleSelectedStyleTag);
  };

  //이미지 삭제 버튼 클릭 함수
  const onClickCloseImage = (index: number) => {
    if (imageAndTag && imageAndTag.length > 1) {
      let newImageAndTag = JSON.parse(
        JSON.stringify(imageAndTag)
      ) as ImageWithTag;
      newImageAndTag.splice(index, 1);
      setImageAndTag(newImageAndTag);
    }
  };

  //이미지 삭제 Alert 확인 버튼 클릭 함수
  const onClickDeleteImageAlertYesButton = () => {
    onClickCloseImage(deleteImageAlertIndex);
    setDeleteImageAlertIndex(0);
  };

  //수정 완료 버튼 클릭 함수
  const onClickSubmitButton = async () => {
    if (imageAndTag !== undefined) {
      const payload = {
        id: Number(router.query!.OOTDNumber![0]),
        content: contents,
        styles: selectedStyle.map((item) => item.id),
        ootdImages: imageAndTag.map((item) => {
          return {
            ootdImage: item.ootdImage,
            clothesTags: item.ootdImageClothesList?.map((items) => {
              return {
                clothesId: items.clothesId,
                deviceWidth: items.deviceSize?.deviceWidth,
                deviceHeight: items.deviceSize?.deviceHeight,
                xrate: items.coordinate?.xrate,
                yrate: items.coordinate?.yrate,
              };
            }),
          };
        }),
        isPrivate: !isOpen,
      };
      const editOOTDSuccess = await putOOTD(
        Number(router.query.OOTDNumber![0]),
        payload
      );

      //edit ootd 성공 여부에 따른 페이지 이동
      if (editOOTDSuccess) {
        router.push(`/ootd/${Number(router.query.OOTDNumber![0])}`);
      } else {
        alert('등록 실패');
      }
    }
  };

  //배경 클릭 함수
  const onClickBackground = () => {
    if (styleModalIsOpen) setStyleModalIsOpen(false);
    if (deleteImageAlertIndex > 0) setDeleteImageAlertIndex(0);
  };
  return (
    <>
      <Background
        isOpen={styleModalIsOpen || deleteImageAlertIndex > 0}
        onClick={onClickBackground}
      />
      <AppBar
        leftProps={<></>}
        middleProps={<Title1>수정하기</Title1>}
        rightProps={
          <Button3 onClick={() => router.back()} style={{ color: 'red' }}>
            취소
          </Button3>
        }
      />
      <S.Layout>
        <S.Main>
          <Body4 className="selectedPhoto" state="emphasis">
            {imageAndTag !== undefined && imageAndTag?.length}장의 사진이 선택됨
          </Body4>
          <S.OOTDImage>
            {imageAndTag &&
              imageAndTag.map((item, index) => {
                return (
                  <div className="image" key={index}>
                    <NextImage
                      width={106}
                      height={106}
                      fill={false}
                      src={item.ootdImage}
                      alt=""
                    />
                    <AiFillCloseCircle
                      onClick={() => setDeleteImageAlertIndex(index)}
                      className="close"
                      viewBox="70 70 890 890"
                    />
                  </div>
                );
              })}
          </S.OOTDImage>
          <S.ImageDivider />
          <S.Text>
            <Input>
              <Input.TextArea
                input={contents}
                setInput={setContents}
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
                state={isOpen}
                setState={setIsOpen}
              />
            </Input>
          </S.Open>
        </S.Main>

        <NextButton
          className="nextButon"
          state={true}
          onClick={onClickSubmitButton}
        >
          저장
        </NextButton>
      </S.Layout>

      {styleModalIsOpen && (
        <StyleModal
          setStyleModalIsOpen={setStyleModalIsOpen}
          styleModalIsOpen={styleModalIsOpen}
          setSelectedStyle={setSelectedStyle}
          styleInitial={selectedStyle}
        />
      )}
      {deleteImageAlertIndex > 0 && (
        <Alert
          headline="첨부된 사진을 삭제하시겠습니까?"
          body={
            <>
              <Body3>수정 단계에서는 새로운 사진을 추가할 수 </Body3>
              <Body3>없습니다. 취소를 누르면 삭제되지 않습니다.</Body3>
            </>
          }
          onClickYesButton={onClickDeleteImageAlertYesButton}
          onClickNoButton={() => setDeleteImageAlertIndex(0)}
          yes="삭제"
          no="취소"
          yesColor="error"
        />
      )}
    </>
  );
};

export default EditOOTD;

EditOOTD.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

EditOOTD.Layout.displayName = 'EditOOTDLayout';

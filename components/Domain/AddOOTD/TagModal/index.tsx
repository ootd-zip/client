import SearchBar from '@/components/SearchBar';
import S from './style';
import ClothInformation from '@/components/ClothInformation';
import { ClothInformationProps } from '@/components/ClothInformation/type';
import { Dispatch, SetStateAction, useState } from 'react';
import TabView from '@/components/TabView';
import { Body4 } from '@/components/UI';
import Modal from '@/components/Modal';
import NewRegister from './NewRegister';

const ClothInformationSampleData = [
  {
    clothId: 1,
    size: 'big',
    clothImage:
      'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    headline: 'Adidas',
    bodyFirst: '전북 현대 유니폼',
    state: 'dark',
    icon: 'like',
  },
  {
    clothId: 2,
    size: 'big',
    clothImage:
      'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    headline: 'Nike',
    bodyFirst: '나이키 하의',
    state: 'light',
    icon: 'like',
  },
  {
    clothId: 3,
    size: 'big',
    clothImage:
      'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    headline: 'Adidas',
    bodyFirst: '전북 현대 유니폼',
    state: 'dark',
    icon: 'like',
  },
  {
    clothId: 4,
    size: 'big',
    clothImage:
      'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    headline: 'Nike',
    bodyFirst: '나이키 하의',
    state: 'light',
    icon: 'like',
  },
  {
    clothId: 5,
    size: 'big',
    clothImage:
      'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    headline: 'Adidas',
    bodyFirst: '전북 현대 유니폼',
    state: 'dark',
    icon: 'like',
  },
  {
    clothId: 6,
    size: 'big',
    clothImage:
      'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    headline: 'Nike',
    bodyFirst: '나이키 하의',
    state: 'light',
    icon: 'like',
  },
] as [...ClothInformationProps[]];

export type ImageWithTag = {
  ootdId: number;
  ootdImage: string;
  tag?: {
    clothId: number;
    clothImage: string;
    xRate: string;
    yRate: string;
    caption: string;
    headline: string;
    bodyFirst: string;
    state: string;
    deviceWidth?: number;
    deviceHeight?: number;
  }[];
}[];

interface AddTagProps {
  setAddTag: Dispatch<SetStateAction<Boolean>>;
  addTag: Boolean;
  setImageAndTag: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  imageAndTag: ImageWithTag | undefined;
  slideIndex: number;
}

export default function AddTag({
  setAddTag,
  addTag,
  setImageAndTag,
  imageAndTag,
  slideIndex,
}: AddTagProps) {
  const categoryList = ['외투', '상의', '하의', '한벌옷', '신발'];
  const [letter, setLetter] = useState<string>('');
  const [clicked, setClicked] = useState<number | null>();

  const onClickCategory = (index: number) => {
    console.log(clicked, index);
    if (clicked === index) {
      setClicked(null);
      return;
    }
    setClicked(index);
  };

  //태그 추가
  const onClickClothInformation = (index: number) => {
    if (imageAndTag) {
      const newTag = JSON.parse(JSON.stringify(imageAndTag));

      if (newTag[slideIndex].tag) {
        newTag[slideIndex].tag?.push({
          clothId: ClothInformationSampleData[index].clothId,
          clothImage: ClothInformationSampleData[index].clothImage,
          headline: ClothInformationSampleData[index].headline,
          bodyFirst: ClothInformationSampleData[index].bodyFirst,
          xRate: '0',
          yRate: '0',
          caption: '',
          state: 'light',
        });
      } else {
        newTag[slideIndex].tag = [
          {
            clothId: ClothInformationSampleData[index].clothId,
            clothImage: ClothInformationSampleData[index].clothImage,
            headline: ClothInformationSampleData[index].headline,
            bodyFirst: ClothInformationSampleData[index].bodyFirst,
            xRate: '0',
            yRate: '0',
            caption: '',
            state: 'light',
          },
        ];
      }

      setImageAndTag(newTag);
      setAddTag(false);
    }
  };

  return (
    <>
      <S.Background onClick={() => setAddTag(false)} addTag={addTag} />
      <Modal height="80" isOpen={addTag}>
        <S.Layout>
          <TabView>
            <TabView.TabBar tab={['내 옷장', '신규 등록']} />
            <TabView.Tabs>
              <TabView.Tab>
                <S.MyCloset>
                  <SearchBar
                    letter={letter}
                    setLetter={setLetter}
                    placeholder="이름, 카테고리 등"
                  />
                  <S.SearchFilter>
                    <S.IsOpenSpan state={true}>
                      <Body4 state="emphasis">공개</Body4>
                    </S.IsOpenSpan>
                    <S.IsOpenSpan state={false}>
                      <Body4 state="emphasis">비공개</Body4>
                    </S.IsOpenSpan>
                    <S.Divider />
                    <S.Category>
                      {categoryList.map((item, index) => {
                        return (
                          <S.CategorySpan
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchEnd={() => onClickCategory(index)}
                            state={index === clicked}
                            key={index}
                          >
                            <Body4 state="emphasis">{item}</Body4>
                          </S.CategorySpan>
                        );
                      })}
                    </S.Category>
                  </S.SearchFilter>
                  <S.List>
                    {ClothInformationSampleData.map((item, index) => {
                      return (
                        <>
                          <div
                            onClick={() => onClickClothInformation(index)}
                            key={index}
                          >
                            <ClothInformation
                              clothId={item.clothId}
                              size={item.size}
                              clothImage={item.clothImage}
                              caption=""
                              headline={item.headline}
                              subHeadline={item.subHeadline}
                              bodyFirst={item.bodyFirst}
                              bodySecond={item.bodySecond}
                              icon={item.icon}
                            />
                          </div>
                          <hr />
                        </>
                      );
                    })}
                  </S.List>
                </S.MyCloset>
              </TabView.Tab>
              <TabView.Tab>
                <NewRegister imageAndTag={imageAndTag} />
              </TabView.Tab>
            </TabView.Tabs>
          </TabView>
        </S.Layout>
      </Modal>
    </>
  );
}

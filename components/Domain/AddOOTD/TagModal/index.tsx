import SearchBar from '@/components/SearchBar';
import S from './style';
import ClothInformation from '@/components/ClothInformation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TabView from '@/components/TabView';
import { Body3, Body4 } from '@/components/UI';
import Modal from '@/components/Modal';
import NewRegister from './NewRegister';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { storedImageKey, userId } from '@/utils/recoil/atom';
import { UserClothDataType } from '../../OOTD/UserCloth';
import Spinner from '@/components/Spinner';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';
import Toast from '@/components/Toast';
import { useRouter } from 'next/router';
import Alert from '@/components/Alert';
import Background from '@/components/Background';
import { ImageWithTag } from '@/utils/types/OOTD.types';

interface AddTagProps {
  setAddTag: Dispatch<SetStateAction<Boolean>>;
  addTag: Boolean;
  setImageAndTag: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  imageAndTag: ImageWithTag | undefined;
  slideIndex: number;
  componentHeight: number;
  componentWidth: number;
}

interface UserTagDataType {
  id: number;
  imageUrl: string;
  name: string;
  userName: string;
  brand: { id: string; name: string };
  category: { id: number; categoryName: string; parentCategoryName: string };
  size: { id: number; name: string; lineNo: string };
  memo: string;
}

export default function AddTag({
  setAddTag,
  addTag,
  setImageAndTag,
  imageAndTag,
  slideIndex,
  componentHeight,
  componentWidth,
}: AddTagProps) {
  const [searchResult, setSearchResult] = useState<UserTagDataType[] | null>(
    null
  );
  const categoryList = [
    '외투',
    '상의',
    '니트웨어',
    '하의',
    '원피스',
    '스포츠',
    '신발',
    '가방',
  ];
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [clicked, setClicked] = useState<number | null>();
  const [notOpenState, setNotOpenState] = useState<Boolean>(false);
  const [goToMypageAlertState, setGoToMypageAlertState] =
    useState<Boolean>(false);

  const setStoredImage = useSetRecoilState(storedImageKey);
  const router = useRouter();

  const onClickCategory = (index: number) => {
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

      if (newTag[slideIndex].ootdImageClothesList) {
        newTag[slideIndex].ootdImageClothesList?.push({
          clothesId: searchResult![index].id,
          clothesImage: searchResult![index].imageUrl,
          brand: searchResult![index].brand.name,
          name: searchResult![index].name,
          coordinate: {
            xrate: '0',
            yrate: '0',
          },
          deviceSize: {
            deviceHeight: componentHeight,
            deviceWidth: componentWidth,
          },
          caption: '',
          state: 'light',
        });
      } else {
        newTag[slideIndex].ootdImageClothesList = [
          {
            clothesId: searchResult![index].id,
            clothesImage: searchResult![index].imageUrl,
            brand: searchResult![index].brand.name,
            name: searchResult![index].name,
            coordinate: {
              xrate: '0',
              yrate: '0',
            },
            deviceSize: {
              deviceHeight: componentHeight,
              deviceWidth: componentWidth,
            },
            caption: '',
            state: 'light',
          },
        ];
      }

      setImageAndTag(newTag);
      setAddTag(false);
    }
  };

  const { getUserClothList } = ClothApi();
  const myId = useRecoilValue(userId);

  useEffectAfterMount(() => {
    setSearchResult(null);
    reset();
  }, [clicked, searchKeyword]);

  const fetchDataFunction = async (page: number, size: number) => {
    const data = await getUserClothList({
      page,
      size,
      userId: myId,
      categoryIds: typeof clicked === 'number' ? [clicked + 1] : undefined,
      searchText: searchKeyword,
      isPrivate: true,
    });

    return data;
  };

  const {
    data: fetchData,
    isLoading,
    hasNextPage,
    reset,
    containerRef,
  } = useInfiniteScroll({
    fetchDataFunction,
    initialData: [],
    size: 7,
  });

  useEffect(() => {
    setSearchResult(fetchData);
  }, [fetchData]);

  const onClickGoToMypageYesButton = () => {
    setStoredImage(imageAndTag);
    router.push(`/mypage/${myId}/cloth`);
  };

  return (
    <>
      <Modal height="96.5" isOpen={addTag}>
        <Background
          onClick={() => setGoToMypageAlertState(false)}
          isOpen={goToMypageAlertState}
        />
        <S.Layout>
          <TabView>
            <TabView.TabBar tab={['내 옷장', '신규 등록']} display="block" />
            <TabView.Tabs>
              <TabView.Tab>
                <S.MyCloset>
                  <SearchBar
                    letter={searchKeyword}
                    setLetter={setSearchKeyword}
                    placeholder="이름, 카테고리 등"
                    onChange={reset}
                  />
                  <S.SearchFilter>
                    <S.IsOpenSpan state={true}>
                      <Body4 state="emphasis">공개</Body4>
                    </S.IsOpenSpan>
                    <S.IsOpenSpan
                      onClick={() => setNotOpenState(true)}
                      state={false}
                    >
                      <Body4 className="hidden" state="emphasis">
                        비공개
                      </Body4>
                    </S.IsOpenSpan>
                    <S.Divider />
                    <S.Category>
                      {categoryList.map((item, index) => {
                        return (
                          <S.CategorySpan
                            onTouchMove={(e) => e.stopPropagation()}
                            onClick={() => onClickCategory(index)}
                            state={index === clicked}
                            key={index}
                          >
                            <Body4 state="emphasis">{item}</Body4>
                          </S.CategorySpan>
                        );
                      })}
                    </S.Category>
                  </S.SearchFilter>
                  <S.List ref={containerRef}>
                    {searchResult?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            onClick={() => onClickClothInformation(index)}
                          >
                            <ClothInformation
                              clothId={item.id}
                              size="small"
                              clothImage={item.imageUrl}
                              caption=""
                              brand={item.brand.name}
                              category={item.category.categoryName}
                              name={item.name}
                              clothSize={item.size.name}
                            />
                          </div>
                          <hr />
                        </>
                      );
                    })}
                  </S.List>
                  {isLoading && hasNextPage && <Spinner />}
                </S.MyCloset>
              </TabView.Tab>
              <TabView.Tab>
                <NewRegister imageAndTag={imageAndTag} />
              </TabView.Tab>
            </TabView.Tabs>
          </TabView>
          {notOpenState && (
            <Toast
              className="toast"
              text="공개로 설정된 옷만 태그할 수 있어요."
              state={notOpenState}
              setState={setNotOpenState}
              actionText="옷장으로 이동"
              actionFunction={() => setGoToMypageAlertState(true)}
              isHelperText={true}
            />
          )}
          {goToMypageAlertState && (
            <Alert
              headline="현재 페이지를 벗어납니다."
              body={
                <Body3>
                  작성 중인 게시글은 임시저장됩니다. 옷장으로 이동하시겠습니까?
                </Body3>
              }
              yes="이동"
              no="취소"
              yesColor="error"
              onClickYesButton={onClickGoToMypageYesButton}
              onClickNoButton={() => setGoToMypageAlertState(false)}
            />
          )}
        </S.Layout>
      </Modal>
    </>
  );
}

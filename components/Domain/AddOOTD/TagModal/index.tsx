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
import Spinner from '@/components/Spinner';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';
import Toast from '@/components/Toast';
import { useRouter } from 'next/router';
import Alert from '@/components/Alert';
import Background from '@/components/Background';

export type ImageWithTag = {
  ootdId: number;
  ootdImage: string;
  ootdImageClothesList?: {
    clothesId: number;
    clothesImage: string;
    coordinate: { xrate: string; yrate: string };
    deviceSize: { deviceWidth: number; deviceHeight: number };
    caption: string;
    size?: string;
    state?: string;
    name?: string;
    brand?: string;
    category?: string;
  }[];
}[];

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

/*
이름: 태그 추가 모달
역할: ootd 등록 시 옷 태그를 추가하는 컴포넌트 모달
*/
export default function AddTag({
  setAddTag,
  addTag,
  setImageAndTag,
  imageAndTag,
  slideIndex,
  componentHeight,
  componentWidth,
}: AddTagProps) {
  //옷 검색 결과
  const [searchResult, setSearchResult] = useState<UserTagDataType[] | null>(
    null
  );

  //카테고리 상위 리스트
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

  const [searchKeyword, setSearchKeyword] = useState<string>(''); //검색어
  const [clickedCategoryIndex, setClickedCategorIndex] = useState<
    number | null
  >(); //현재 선택된 카테고리 인덱스
  const [notOpenState, setNotOpenState] = useState<Boolean>(false); // 비공개 클릭 시 토스트 렌더링 유무
  const [goToMypageAlertState, setGoToMypageAlertState] =
    useState<Boolean>(false); //마이페이지로 이동 Alert 창 렌더링 유무

  const setStoredImage = useSetRecoilState(storedImageKey); // 임시저장된 ootd
  const router = useRouter();
  const { getUserClothList } = ClothApi();
  const myId = useRecoilValue(userId); //로그인한 유저 id

  //카테고리 버튼 클릭 함수
  const onClickCategory = (index: number) => {
    if (clickedCategoryIndex === index) {
      setClickedCategorIndex(null);
      return;
    }
    setClickedCategorIndex(index);
  };

  //옷 태그 추가
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

  //카테고리 선택 인덱스나, 검색어가 변경되면 재검색
  useEffectAfterMount(() => {
    setSearchResult(null);
    reset();
  }, [clickedCategoryIndex, searchKeyword]);

  //옷 조회 api 호출 함수
  const fetchDataFunction = async (page: number, size: number) => {
    const data = await getUserClothList({
      page,
      size,
      userId: myId,
      categoryIds:
        typeof clickedCategoryIndex === 'number'
          ? [clickedCategoryIndex + 1]
          : undefined,
      searchText: searchKeyword,
      isPrivate: true,
    });

    return data;
  };

  //인피니티 스크롤
  const {
    data: fetchData,
    isLoading,
    hasNextPage,
    reset,
    containerRef,
  } = useInfiniteScroll({
    fetchDataFunction,
    initialData: [],
    size: 12,
  });

  //api 호출이 완료되면 검색 결과로 업데이트
  useEffect(() => {
    setSearchResult(fetchData);
  }, [fetchData]);

  //마이페이지로 이동하기 버튼 클릭 이벤트
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
          {/*TabView를 활용해 슬라이드 컴포넌트 구현*/}
          <TabView>
            <TabView.TabBar tab={['내 옷장', '신규 등록']} display="block" />
            <TabView.Tabs>
              <TabView.Tab>
                <S.MyCloset>
                  {/*검색 컴포넌트*/}
                  <SearchBar
                    letter={searchKeyword}
                    setLetter={setSearchKeyword}
                    placeholder="이름, 카테고리 등"
                    onChange={reset}
                  />
                  {/*검색에 사용되는 필터*/}
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
                    {/*검색에 사용되는 필터 - 카테고리*/}
                    <S.Category>
                      {categoryList.map((item, index) => {
                        return (
                          <S.CategorySpan
                            onTouchMove={(e) => e.stopPropagation()}
                            onClick={() => onClickCategory(index)}
                            state={index === clickedCategoryIndex}
                            key={index}
                          >
                            <Body4 state="emphasis">{item}</Body4>
                          </S.CategorySpan>
                        );
                      })}
                    </S.Category>
                  </S.SearchFilter>
                  {/*검색 결과 리스트*/}
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
              {/*새로운 등록 탭*/}
              <TabView.Tab>
                <NewRegister imageAndTag={imageAndTag} />
              </TabView.Tab>
            </TabView.Tabs>
          </TabView>
          {/*비공개 버튼 클릭시 보여지는 Toast*/}
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
          {/*마이페이지로 이동 Alert 창*/}
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

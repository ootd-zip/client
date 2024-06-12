import Modal from '@/components/Modal';
import S from './style';
import { Body4, Button3, Title1 } from '@/components/UI';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BrandList from '@/components/BrandList';
import { BrandType } from '@/components/BrandList/Brand';
import SearchBar from '@/components/SearchBar';
import { AiOutlineClose } from 'react-icons/ai';
import NextButton from '@/components/NextButton';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import CheckBoxTrue from '@/public/images/CheckBoxTrue.svg';
import CheckBoxFalse from '@/public/images/CheckBoxFalse.svg';
import Input from '@/components/Input';

interface BrandModalProps {
  brandModalIsOpen: Boolean;
  setBrandModalIsOpen: Dispatch<SetStateAction<Boolean>>;
  setClothBrand: Dispatch<SetStateAction<BrandType[] | null>>;
}

export default function BrandModal({
  brandModalIsOpen,
  setBrandModalIsOpen,
  setClothBrand,
}: BrandModalProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [brandList, setBrandList] = useState<BrandType[] | null>(null);
  const [selectedBrandList, setSelectedBrandList] = useState<
    BrandType[] | null
  >(null);
  const [noBrandState, setNoBrandState] = useState<Boolean>(false);

  const { getBrand, postBrand } = ClothApi();

  const onClickCloseBrandButton = (id: number) => {
    if (brandList) {
      const newBrandList = brandList.map((item) => {
        if (item.id === id) {
          return { ...item, state: false };
        }
        return item;
      });

      setBrandList(newBrandList);
    } else {
      setSelectedBrandList(null);
    }
  };

  const onClickNextButton = () => {
    if (noBrandState) {
      setClothBrand([{ id: 9999, name: '브랜드 없음' }]);
      setBrandModalIsOpen(false);
      postBrand({ name: noBrandName });
      return;
    }
    setClothBrand(selectedBrandList);
    setBrandModalIsOpen(false);
  };

  useEffect(() => {
    const fetchBrand = async () => {
      const result = await getBrand(searchKeyword);
      setBrandList(result);
    };
    if (searchKeyword === '') setBrandList(null);
    if (searchKeyword.length > 0) fetchBrand();
  }, [searchKeyword]);

  useEffect(() => {
    if (brandList && brandList.length > 0) {
      setNoBrandState(false);
    }
  }, [brandList]);

  const [noBrandName, setNoBrandName] = useState<string>('');

  return (
    <Modal isOpen={brandModalIsOpen} height="90">
      <S.Layout>
        <S.Title>
          <Title1 className="title">브랜드</Title1>
          <AiOutlineClose
            onClick={() => setBrandModalIsOpen(false)}
            className="close"
          />
        </S.Title>
        <S.Search>
          <SearchBar
            state={noBrandState ? 'disabled' : ''}
            placeholder="검색"
            letter={searchKeyword}
            setLetter={setSearchKeyword}
          />
        </S.Search>
        <S.BrandList>
          {(!brandList || brandList.length === 0) && (
            <S.NoBrand
              onClick={() => setNoBrandState(!noBrandState)}
              state={noBrandState}
            >
              {noBrandState ? <CheckBoxTrue /> : <CheckBoxFalse />}
              <Body4 className="noBrand">찾고 있는 브랜드가 없어요.</Body4>
            </S.NoBrand>
          )}
          {noBrandState && (
            <S.NoBrandInput>
              <Title1>찾고 있는 브랜드를 알려주세요.</Title1>
              <Body4 className="noBrandinfo1">
                저희에게 알려주시면 최대한 빨리 업데이트하겠습니다.
              </Body4>
              <Body4 className="noBrandinfo2">
                업데이트가 완료되면 알림을 통해 바로 알려드릴게요!
              </Body4>
              <Input>
                <Input.Text
                  placeholder="브랜드명 (나이키, cos 등)"
                  size="big"
                  line="outline"
                  state={true}
                  onChange={setNoBrandName}
                />
              </Input>
            </S.NoBrandInput>
          )}
          <BrandList
            brandInitial={null}
            brandList={brandList}
            setBrandList={setBrandList}
            setSelectedBrand={setSelectedBrandList}
            keyword={searchKeyword.length > 0 ? searchKeyword : undefined}
            many="one"
          />
        </S.BrandList>
        <S.SelectedBrand>
          {selectedBrandList &&
            selectedBrandList.map((item, index) => {
              return (
                <S.SelectedBrandSpan key={index}>
                  <Button3>{item.name}</Button3>
                  <AiOutlineClose
                    onClick={() => onClickCloseBrandButton(item.id)}
                    className="close"
                  />
                </S.SelectedBrandSpan>
              );
            })}
        </S.SelectedBrand>
        <NextButton
          className="nextButton"
          state={
            (selectedBrandList !== null && selectedBrandList.length > 0) ||
            noBrandState
          }
          onClick={onClickNextButton}
        >
          완료
        </NextButton>
      </S.Layout>
    </Modal>
  );
}

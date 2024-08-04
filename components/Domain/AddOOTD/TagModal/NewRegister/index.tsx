import { Body3, Button3, Headline2 } from '@/components/UI';
import S from './style';
import { useRouter } from 'next/router';
import { ImageWithTag } from '..';
import { useSetRecoilState } from 'recoil';
import { storedImageKey } from '@/utils/recoil/atom';

interface NewRegisterProps {
  imageAndTag: ImageWithTag | undefined;
}
/*
이름: 새로운 옷 등록
역할: 태그 모달에서 사용되는 새로운 옷 등록 컴포넌트
*/
export default function NewRegister({ imageAndTag }: NewRegisterProps) {
  const router = useRouter();

  const setStoredImage = useSetRecoilState(storedImageKey); //임시저장된 ootd

  //옷 추가 버튼 클릭 함수
  const onClickAddClothButton = () => {
    setStoredImage(imageAndTag);
    router.push(`/add-cloth`);
  };

  return (
    <S.Layout>
      <S.Text>
        <Headline2>
          옷장에 아직 없는 옷을 <br />
          태그하고 싶어요.
        </Headline2>
        <Body3 className="helper">
          옷장에 저장된 옷만 태그할 수 있습니다.
          <br /> 아래 '의류 추가하기' 버튼을 누르면
          <br />
          옷장에 옷을 추가할 수 있습니다. <br />
          작성 중인 게시글은 임시저장됩니다.
        </Body3>
      </S.Text>
      <S.AddClothButton onClick={onClickAddClothButton}>
        <Button3>의류 추가하기</Button3>
      </S.AddClothButton>
    </S.Layout>
  );
}

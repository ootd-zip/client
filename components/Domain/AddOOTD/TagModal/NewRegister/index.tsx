import { Body3, Button3, Headline2 } from '@/components/UI';
import S from './style';
import { useRouter } from 'next/router';
import { ImageWithTag } from '@/utils/types/OOTD.types';
import { useSetRecoilState } from 'recoil';
import { storedImageKey } from '@/utils/recoil/atom';

interface NewRegisterProps {
  imageAndTag: ImageWithTag | undefined;
}

export default function NewRegister({ imageAndTag }: NewRegisterProps) {
  const router = useRouter();

  const setStoredImage = useSetRecoilState(storedImageKey);

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

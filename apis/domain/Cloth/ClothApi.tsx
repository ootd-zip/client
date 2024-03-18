import {
  getClothListParams,
  patchClothIsPrivateType,
  postClothPayload,
} from '@/apis/_api/type';
import { systemService, userService } from '@/apis/_service';

export default function ClothApi() {
  //cloth 작성
  const postCloth = async (payload: postClothPayload) => {
    try {
      const { statusCode } = await userService.postCloth(payload);
      if (statusCode === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      alert('관리자에게 문의하세요');
      console.log('에러명:', err);
    }
  };

  //유저의 cloth 리스트 조회
  const getUserClothList = async (params: getClothListParams) => {
    try {
      const { result } = await userService.getUserClothList(params);

      return result;
    } catch (err) {
      alert('관리자에게 문의하세요');
      console.log('에러명:', err);
    }
  };

  //cloth 상세 정보 조회
  const getClothDetail = async (id: number) => {
    try {
      const { result } = await userService.getClothDetail(id);

      return result;
    } catch (err) {
      alert('관리자에게 문의하세요');
      console.log('에러명:', err);
    }
  };

  //cloth 삭제
  const deleteCloth = async (id: number) => {
    try {
      const { statusCode } = await userService.deleteCloth(id);

      if (statusCode === 200) return true;
      return false;
    } catch (err) {
      alert('관리자에게 문의하세요');
      console.log('에러명:', err);
    }
  };

  //cloth 수정
  const putCloth = async (id: number, payload: postClothPayload) => {
    try {
      const { statusCode } = await userService.putCloth(id, payload);

      if (statusCode === 200) {
        return true;
      }
      return false;
    } catch (err) {
      alert('관리자에게 문의하세요');
      console.log('에러명:', err);
    }
  };

  //cloth 공개여부 수정
  const patchClothIsPrivate = async (
    id: number,
    payload: patchClothIsPrivateType
  ) => {
    try {
      const { result } = await userService.patchClothIsPrivate(id, payload);

      return result;
    } catch (err) {
      alert('관리자에게 문의하세요');
      console.log('에러명:', err);
    }
  };

  //카테고리 가져오기
  const getClothCategory = async () => {
    const { result } = await systemService.getClothCategory();

    return result;
  };

  //색상 가져오기
  const getColor = async () => {
    const { result } = await systemService.getClothColor();

    return result;
  };

  //브랜드 가져오기
  const getBrand = async (keyword: string) => {
    const { result } = await systemService.getBrand(keyword);

    return result;
  };

  //사이즈 가져오기
  const getSize = async (id: number) => {
    const result = await systemService.getSize(id);
    return result;
  };

  //이 옷을 활용한 OOTD 조회
  const getOOTDWithCloth = async (clothId: number) => {
    try {
      const { result } = await userService.getOOTDWithCloth(clothId);
      return result;
    } catch (err) {
      alert('관리자에게 문의하세요');
      console.log('에러명', err);
    }
  };
  return {
    postCloth,
    getUserClothList,
    getClothDetail,
    deleteCloth,
    putCloth,
    patchClothIsPrivate,
    getClothCategory,
    getColor,
    getBrand,
    getSize,
    getOOTDWithCloth,
  };
}

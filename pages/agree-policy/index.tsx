import AppBar from '@/components/Appbar';
import S from '@/pageStyle/privacy-policy/style';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Body2, Body4 } from '@/components/UI';
import { ComponentWithLayout } from '../sign-up';
import { AppLayoutProps } from '@/AppLayout';

/*
이름: 약관 페이지
역할: 설정 약관 페이지
*/

const AgreePolicy: ComponentWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <S.Layout>
        <AppBar
          leftProps={
            <AiOutlineArrowLeft
              onClick={() => router.back()}
              className="arrowleft"
            />
          }
          middleProps={<></>}
          rightProps={<></>}
        />
        <S.Text>
          <Body2>1. 목적</Body2>
          <Body4>
            이 약관은 회원 간의 정보를 상호 교환할 수 있도록 제작진 이하 회사 이
            운ootdzip 제작진(이하 '회사')이 운영 및 제공하는 이하 서비스 에 대한
            것으로 본 약관은 서비스 이용과 관련ootdzip(이하 '서비스')데 대한
            것으로, 본 약관은 서비스 이용과 관련하여 회사와 회원의 권리 의무 및
            책임사항 기타 필요한 사항을 규정합니다.
          </Body4>
          <br />

          <Body2>2. 용어 정의</Body2>
          <Body4>
            이 약관에서 사용하는 용어의 정의는 다음 각 호와 같으며, 정의되지
            않은 용어에 대한 해석은 관계 법령 및 지침, 본 이용약관,
            개인정보처리방침, 상관례 등에 의합니다.
          </Body4>
          <Body4>
            - 서비스 라 함은 모바일 환경에서 제공하는 ootd 서비스 및 관련 제반
            서비스를 말합니다.
          </Body4>
          <Body4>
            - '회원'이라 함은 회사의 서비스에 접속하여 이 약관에 따라 회사와
            이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을
            말합니다.
          </Body4>
          <Body4>
            - '게시물' 이라 함은 회원이 서비스를 이용함에 있어 서비스 상에
            게시한 문자, 동영상, 음성, 음향, 화상 등의 정보 형태의 글 댓글 및
            답글 포함 , 사진 이미지 , 동영상 및 각종 파일과 링크 등 일체를
            의미합니다.
          </Body4>
          <Body4>
            - '회원정보' 라 함은 서비스를 이용하는 고객이 등록한 정보를
            말합니다.
          </Body4>
          <br />

          <Body2>3. 약관의 명시, 효력 및 변경</Body2>
          <Body4>
            1) 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기
            화면에 게시합니다.
          </Body4>
          <Body4>
            2) 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
            현행약관과 함께 제 1항의 방식에 따라 그 개정약관의 적용일자 7일
            전부터 공지합니다. 다만, 회원에게 불리한 내용으로 약관을 개정하는
            경우에는 그 적용일자 30일 전부터 마이페이지 내 공지사항 게시판을
            이용해 사전 고지합니다.
          </Body4>
          <Body4>
            3) 회사가 전항에 따라 회원에게 통지하면서 공지 기간 이내에
            거부의사를 표시하지 않으면 승인한 것으로 본다는 뜻을 명확하게
            고지하였음에도 회원이 명시적으로 거부 의사를 밝히지 않거나, 서비스
            이용을 지속할 경우에는 회원이 개정약관에 동의한 것 으로 봅니다.
          </Body4>
          <br />

          <Body2>4. 이용계약의 체결</Body2>
          <Body4>
            1. 이용계약은 회원이 되고자 하는 자 이하 가입신청자 가 약관의 내용에
            대하여 동의를 한 후 회원가입신청을 하고 회사 가 이러한 신청에 대하여
            승낙함으로써 체결됩니다. 회사는 가입신청자의 신청에 대하여 서비스
            이용을 승낙함을 원칙으로 합니다. 다만, 회사는 다음 각 호에 해당하는
            신청에 대하여는 승낙을 하지 않거나, 사후에 이용 계약을 해지할 수
            있습니다.
          </Body4>
          <Body4>
            - 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는
            경우
          </Body4>
          <Body4>- 타인의 명의를 도용하여 이용신청을 하는 경우</Body4>
          <Body4>
            - 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은
            경우
          </Body4>
          <Body4>- 14세 미만일 경우</Body4>
          <Body4>
            - 이용자의 귀책사유로 승인이 불가능하거나 기타 규정한 제반 사항을
            위반하며 신청하는 경우
          </Body4>
          <Body4>
            - 과거에 회사가 회원의 계정을 이용약관 위반을 이유로 하여 계정
            비활성화 혹은 계정 삭제 조치를 한 적이 있는 경우
          </Body4>
          <Body4>
            2. 회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상
            문제가 있는 경우에는 승낙을 유보할 수 있습니다.
          </Body4>
          <Body4>
            3. 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, 회사는
            원칙적으로 이를 가입신청자에게 알리도록 합니다.
          </Body4>
          <Body4>
            4. 이용계약의 성립 시기는 회사가 가입완료를 신청절차 상에서 표시한
            시점으로 합니다.
          </Body4>
          <br />

          <Body2>5. 회원의 계정 관리에 대한 의무</Body2>
          <Body4>
            1) 회원의 계정 아이디 및 비밀번호 를 포함 에 관한 관리책임은
            회원에게 있으며, 이를 제 3자가 이용하도록 하여서는 안 됩니다.
          </Body4>
          <Body4>
            2) 회사는 회원의 계정이 개인정보 유출 우려가 있거나, 회사 및 회사의
            운영자로 오인한 우려가 있는 경우 등 회원 및 서비스 보호에 필요한
            경우 해당 계정의 이용을 제한할 수 있습니다.
          </Body4>
          <Body4>
            3) 회원은 계정이 도용되거나 제 3자가 이용하고 있음을 인지한 경우에는
            이를 즉시 회사에게 통지하고 회사의 안내에 따라야 합니다.
          </Body4>
          <Body4>
            4) 제 3항의 경우에 해당 회원이 회사에 그 사실을 통지하지 않거나,
            통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여
            회사는 책임지지 않습니다.
          </Body4>
          <br />

          <Body2>6. 이용제한</Body2>
          <Body4>
            1) 회사는 회원이 이 약관 또는 관련 법령을 위반하거나 서비스의
            정상적인 운영을 방해한 경우, 경고, 영구이용정지 탈퇴 및 재가입 제한
            조치 포함 등 이하 이용제한 으로 서비스 이용을 단계적으로 제한할 수
            있습니다.
          </Body4>
          <Body4>
            2) 회사는 전항에도 불구하고, 회원의 의무 위반 행위나 서비스 운영
            방해 행위에 대하여 사안의 중대성이나 긴급성 등을 토대로 서비스에
            미치는 영향을 고려하여 경고 등의 단계적인 조치를 거치지 않고 곧바로
            영구이용정지(탈퇴 및 재가입 제한 조치 포함)를 할 수 있습니다.
          </Body4>
          <Body4>
            특히, '주민등록법'을 위반한 명의도용 및 결제도용, '저작권법'을
            위반한 불법프로그램의 제공 및 운영방해, '정보통신망법'을 위반한
            불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이
            관련법을 위반하여 서비스에 중대한 영향을 끼친 경우에는 즉시
            영구이용정지를 할 수 있으며, 영구이용정지를 할 수 있는 위반행위는
            이에 제한되지 않습니다. 본 항에 따른 영구이용정지 시 회원이 게시 및
            저장한 콘텐츠는 모두 삭제되며 회사는 이에 대해 책임지지 않습니다.
          </Body4>
          <Body4>
            3) 본 조에 따른 '이용제한 등' 의 사유는 아래의 사항을 포함하나 이에
            한하지 아니하며, 구체적인 제한의 조건 및 세부내용은 본 약관 또는
            운영 정책 및 개별 서비스 상의 이용약관이나 운영정책에서 정하는 바에
            의합니다.
          </Body4>
          <Body4>
            - 이용정지 중인 계정을 소유한 회원과 동일인임이 확인되는 활성계정
          </Body4>
          <Body4>- 본 약관 또는 관련 법령 위반</Body4>
          <Body4>
            4. 회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라
            이의신청을 할 수 있습니다. 이때 이의가 정당하다고 회사가 인정하는
            경우 회사는 즉시 서비스의 회원의 이용을 재개합니다.
          </Body4>
          <br />

          <Body2>7. 계약해지</Body2>
          <Body4>
            1) 회원은 언제든지 마이페이지의 설정 메뉴 '탈퇴하기'를 통해
            이용약관에 대한 동의를 철회하거나 이용계약 해지(탈퇴) 신청을 할 수
            있습니다.
          </Body4>
          <Body4>
            2) 회원이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라
            회사가 회원정보를 보유하는 경우를 제외하고 해지(탈퇴) 즉시 회원의
            모든 데이터는 소멸됩니다. 다만, 아래와 같은 경우 해지(탈퇴) 처리가
            제한될 수 있습니다.
          </Body4>
          <Body4>- 본 약관 제 6조에 따라 이용제한 등의 조치가 된 경우</Body4>
          <Body4>
            3) 회원이 계약을 해지하는 경우, 회원의 프로필, 회원이 작성한 게시물
            중 ootd, 옷과 같이 본인 계정에 등록된 게시물 일체와 타인의 게시물에
            남긴 댓글 및 답글 일체는 삭제됩니다.
          </Body4>
          <br />

          <Body2>8. 서비스의 이용</Body2>
          <Body4>
            1) 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절
            또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로
            중단할 수 있습니다. 이 경우 회사는 회원에게 사전통지합니다. 다만,
            회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할
            수 있습니다.
          </Body4>
          <Body4>
            2) 회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며,
            정기점검시간은 서비스제공화면 등에 공지한 바에 따릅니다.
          </Body4>
          <br />

          <Body2>9. 게시물의 저작권</Body2>
          <Body4>
            1) 회원은 저작권, 상표권 등 지식재산권, 개인정보 등 제 3자의 권리를
            침해하여서는 아니되며, 저작권, 개인정보 보호 관련 규정 등 관련
            법령을 준수하기 위해 충분한 주의를 기울여야만 합니다. 만약 회원이
            등록한 게시물이 제 3자의 저작권 등 권리를 침해한 경우, 그와 같은
            침해에 대하여 회사의 고의 또는 중과실이 인정되지 아니하는한,
            민형사상 모든 책임은 회원 당사자에게 있습니다.
          </Body4>
          <Body4>
            2) 회원은 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이
            귀속된 정보를 회사의 사전 승낙없이 복제, 송신, 출판, 배포, 방송 기타
            방법에 의하여 영리목적으로 이용하거나 제 3자에게 이용하게 하여서는
            안됩니다.
          </Body4>
          <Body4>
            3) 회사는 회원이 작성한 각종 게시물을 판촉, 홍보 등의 목적으로
            서비스에서 사용하는 것 외에도 서비스 제공에 필요한 범위에서 타
            사이트에 복제, 배포, 전송, 전시할 수 있으며, 본질적인 내용에 변경을
            가하지 않는 범위 내에서 수정, 편집될 수 있습니다.
          </Body4>
          <Body4>
            4) 회원이 공개한 게시물은 서비스를 통해 전체 회원, 관련 제반
            서비스에 공유될 수 있으며, 회사는 해당 게시물을 서비스의 홍보, 안내
            등의 목적으로 사용할 수 있습니다.
          </Body4>
          <Body4>
            5) 회사가 작성한 저작물에 대한 저작권 및 기타 지적 재산권은 회사에
            귀속합니다.
          </Body4>
          <br />

          <Body2>10. 게시물의 관리</Body2>
          <Body4>
            1) 자동화된 수단을 활용하는 등 서비스의 기능을 비정상적으로 이용하여
            게재된 게시물, 서비스의 제공 취지와 부합하지 않는 내용의 게시물은
            다른 이용자들의 정상적인 서비스 이용에 불편을 초래하고 더 나아가
            서비스의 원활한 제공을 방해하므로 역시 제한될 수 있습니다. 이용
            제한의 대상이 될 수 있는 부적절한 게시물에 대한 상세한 내용은 본
            약관 제 12조의 규정 및 정보통신에 관한 심의 규정, 기타 운영 정책
            등을 참고해 주시기 바랍니다.
          </Body4>
          <Body4>
            2) 회원은 자신의 게시물이 타인의 저작권이나 명예 등 제 3자의 권리를
            침해하지 않도록 주의하여야 합니다. '정보통신망법' 또는 '저작권법'
            등을 근거로 권리 침해 주장자는 회사에 게시물 게시중단을 요청할 수
            있습니다. 또한 원 게시자는 해당 게시물 게시 재개 등을 내용으로 하는
            이의신청을 할 수 있습니다. 타인의 게시물로 인해 자신의 저작권이나
            명예가 침해되었다고 생각하는 회원은 마이메이지 설정 내 문의하기를
            통해 회사에게 요청할 수 있습니다.
          </Body4>
          <Body4>
            3) 회사는 전항에 따른 권리자의 요청이 없는 경우라도 '전자상거래법',
            '정보통신망법', '저작권법', '정보통신에 관한 심의 규정' 등
            권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에
            위반되는 경우에는 관련법에 따라 게시물에 대해 임시조치 등을 취할 수
            있습니다.
          </Body4>
          <Body4>
            4) 본 조에 따라 부적절한 게시글을 게시한 회원에 대해서는 제 6조 및
            운영정책에 따라 이용제한 조치를 취할 수 있습니다.
          </Body4>
          <br />

          <Body2>11. 권리의 귀속</Body2>
          <Body4>
            1) 서비스에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단,
            회원의 게시물은 제외합니다.
          </Body4>
          <Body4>
            2) 회사는 서비스와 관련하여 회원에게 회사가 정한 이용조건에 따라
            계정, 닉네임 등 을 이용할 수 있는 이용권한만을 부여하며 회원은 이에
            대한 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.
          </Body4>
          <Body4>
            3) 회사가 서비스를 제공함에 따라 사용되는 보안 기술이나 소프트웨어에
            대해 회원은회피 또는 변경하려 시도를 하여서는 안되며, 서비스 및 이에
            필요한 기술 또는 소프트웨어를 부정 사용 및 타인이 그렇게 하는 것을
            조정하는 행위 등은 금지되어 있습니다. 만약 회원이 그와 같은 행위를
            하는 경우 이에 대한 모든 책임은 회원 본인에게 있습니다.
          </Body4>
          <br />

          <Body2>12. 커뮤니티 가이드라인</Body2>
          <Body4>
            1) ootdzip은 사람들이 자유롭게 자신을 표현하고 서로 영감을 얻을 수
            있는 커뮤니티 공간입니다. 회사는 계속해서 안전하고 믿을 수 있는
            공간을 만들어나갈 수 있도록 커뮤니티 가이드라인을 운영합니다. 회원은
            해당 커뮤니티 가이드라인 및 관련 법령을 준수해야 합니다.
          </Body4>
          <Body4>
            2) 회원은 아래 사항을 위반하는 경우 콘텐츠가 삭제되거나, 계정
            이용정지 조치 등의 제재를 받을 수 있습니다. 다만, 아래 사항에 한하지
            아니하며 관련 법령을 위반하는 등 부적절하다고 판단될 경우 같은
            조치를 취할 수 있습니다.
          </Body4>
          <Body4>- 판매 또는 직거래 유도</Body4>
          <Body4>- 비방, 명예훼손 및 수치심 유발</Body4>
          <Body4>
            - 혐오적, 외설적, 범죄적 행위 등 공공질서 및 미풍양속 위반
          </Body4>
          <Body4>- 서비스에 대한 허위 및 오해의 소지가 있는 행동</Body4>
          <Body4>- 저작권 위반, 개인정보 노출 등 권리침해 우려</Body4>
          <Body4>- 정치적, 종교적 분쟁 야기</Body4>
          <Body4>- 스팸 또는 지나치게 상업적인 내용</Body4>
          <Body4>- 개인정보 도용, 사칭 또는 타인의 정보를 무단 위변조</Body4>
          <Body4>
            3) 회원은 다른 사용자나 콘텐츠가 커뮤니티 가이드라인을 포함,
            부적절하다고 판단할 경우 해당 사용자나 콘텐츠를 신고할 수 있습니다.
            회사는 해당 신고의 내용이 타당하다고 판단할 경우 신고 접수
            시간으로부터 24시간 이내에 관련 약관에 따라 조치를 취합니다.
          </Body4>
          <Body4>
            4) 본 조에 따라 회사가 회원에게 가한 제재 이력은 탈퇴 및 재가입 방지
            조치 를 위해 보관됩니다.
          </Body4>
          <br />

          <Body2>13. 회사의 의무</Body2>
          <Body4>
            1) 회사는 관련 법령 및 이 약관 등에서 금지한 행위를 하지 않으며,
            계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여
            노력합니다.
          </Body4>
          <Body4>
            2) 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보 보호를
            위해 보안시스템을 갖추어야 하며 개인정보보호정책을 공시하고
            준수합니다.
          </Body4>
          <Body4>
            3) 회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이 불만이
            정당하다고 인정할 경우에는 이를 처리하여야 합니다. 회원이 제기한
            의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을
            통하여 회원에게 처리과정 및 결과를 전달합니다.
          </Body4>
          <br />

          <Body2>14. 부적절 행위</Body2>
          <Body4>
            1) 회사는 본 약관에서 명시한 사항들과 관련 법령 등을 위반하는 부적절
            행위를 행한 회원에게 서비스의 이용에 대한 제재를 가할 수 있으며,
            필요한 경우 관련 법령에 따라 민형사상의 책임을 물을 수 있으니 이용에
            주의 부탁드립니다.
          </Body4>
          <Body4>
            2) 회원이 다음의 사유에 해당하는 부적절 행위를 한 경우 회사는 사전
            통보없이 해당 회원이 등록한 내용을 삭제조치하고 회원의 서비스 이용을
            제한하거나 회원 자격을 상실시킬 수 있습니다.
          </Body4>
          <Body4>- 타인의 정보 도용</Body4>
          <Body4>
            - 서비스에서 예정하고 있거나 회사가 허락한 범위를 벗어나 영리를
            목적으로 서비스를 사용하는 행위
          </Body4>
          <Body4>- 서비스에 허위정보 등록</Body4>
          <Body4>- 과대, 과장 광고 스팸성 홍보글, 도배행위 등</Body4>
          <Body4>
            - 회사의 승인을 구하지 않은 상업성 광고 개인사업자, 법인의 자사홍보
            등
          </Body4>
          <Body4>
            - 대가를 받고 게시물을 작성하였음에도 이러한 사실을 관련 법령에 따라
            밝히지 않은 게시물
          </Body4>
          <Body4>
            - 타인의 전화번호 또는 이메일을 도용하거나 허위로 이메일을 기재하여
            이득을 취하는 행위
          </Body4>
          <Body4>
            - 회사의 업무에 방해되거나 기타 회사가 필요하다고 판단하는 경우
          </Body4>
          <Body4>
            - 기타 관련 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여
            공지한 주의사항, 회사가 통지하는 사항을 위반한 행위
          </Body4>
          <br />

          <Body2>15. 회사의 면책 등</Body2>
          <Body4>
            1) 회사는 천재지변 또는 이에 준하는 불가항력, 회사의 과실 없이
            발생한 정보통신설비의 보수점검, 교체 또는 고장, 통신의 두절 등으로
            인하여 일시적으로 또는 종국적으로 서비스를 제공할 수 없는 경우,
            서비스 제공에 관한 책임이 면제됩니다. 이 경우 회사는 회사가 제공하는
            인터넷사이트 화면에 게시하거나 기타 방법으로 회원들에게 공지합니다.
          </Body4>
          <Body4>
            2) 회사는 회사의 고의 또는 과실이 없는 한 인터넷 이용자 또는 회원의
            귀책사유로 인한 서비스 이용의 장애에 대하여 책임지지 않습니다.
          </Body4>
          <Body4>
            3) 회사는 자신의 개인정보를 타인에게 유출 또는 제공함으로써,
            발생하는 피해에 대해서 회사는 일체의 책임을 지지 않습니다.
          </Body4>
          <Body4>
            4) 회사는 다음과 같은 사항으로부터 발생하는 손해에 대해 책임을 지지
            아니합니다.
          </Body4>
          <Body4>- 회원 상태 정보의 허위 또는 부정확성에 기인하는 손해</Body4>
          <Body4>
            - 그 성질과 경위를 불문하고 서비스에 대한 접속 및 서비스의
            이용과정에서 발생하는 개인적인 손해
          </Body4>
          <Body4>
            - 서버에 대한 제 3자의 모든 불법적인 접속 또는 서버의 불법적인
            이용으로부터 발생하는 손해
          </Body4>
          <Body4>
            - 서버에 대한 전송 또는 서버로부터의 전송에 대한 제 3자의 모든
            불법적인 방해 또는 중단행위로부터 발생하는 손해
          </Body4>
          <Body4>
            - 제 3자가 서비스를 이용하여 불법적으로 전공, 유포하거나 또는 전송,
            유포되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로
            인한 손해
          </Body4>
          <Body4>
            - 전송된 데이터의 오류 및 생략, 누락, 파괴 등으로 발생되는 손해
          </Body4>
          <Body4>
            - 회원 간의 회원 상태 정보 등록 및 서비스 이용 과정에서 발생하는
            명예훼손 기타 불법행위로 인한 각종 민형사상 책임
          </Body4>
          <Body4>
            - 회원의 법령, 이용약관, 이용정책 계약 위반에서 기인하는 손해
          </Body4>
          <Body4>
            5) 회사는 회원이 계약 체결을 한 개인 본인이 아닌 제 3자 또는
            사업자로서 서비스를 이용하거나 거래하는 등 본 약관 도는 법령 위반을
            전제로 한 어떠한 요구에도 응하지 아니하며, 필요한 경우 관계 당국에
            신고하는 등의 조치를 취할 수 있습니다.
          </Body4>
          <br />

          <Body2>16. 회원이 회사에 위임하는 권리</Body2>
          <Body4>
            1) 회원은 제 9조와 관련하여 회사에 회원의 콘텐츠 사용을 허용하는
            권리를 부여합니다. 이는 회사에 회원이 게시한 콘텐츠에 대한 소유권을
            주장하지 않는 것과는 별개입니다. 회원은 회원의 콘텐츠를 호스팅,
            사용, 배포, 수정, 실행, 복사, 공개적으로 수행 또는 표시, 번역 및
            파생된 저작물을 생성할 수 있는 비독점적인 권한을 회사에 부여합니다.
            회원은 회원의 콘텐츠를 개별적으로 삭제하거나 이용계약 해지 탈퇴 를
            통해 한 번에 모두 삭제할 수 있습니다.
          </Body4>
          <Body4>
            2) 제 1항과 관련하여 회사의 이용을 원치 않는 콘텐츠의 게시자는
            마이페이지 내 문의하기 를 통해 의사를 표시할 수 있습니다.
          </Body4>
          <Body4>
            3) 회원은 회사에 회원의 기기에서 서비스 업데이트를 다운로드하고
            설치할 수 있다는 것에 동의합니다.
          </Body4>
          <br />

          <Body2>17. 기타</Body2>
          <Body4>
            1) 본 약관에 대해서는 대한민국법을 준거법으로 하고, 대한민국 법원이
            관할권을 갖는 것으로 합니다.
          </Body4>
          <br />

          <Body4>· 시행일자: 2024년 5월 14일</Body4>
          <br />
        </S.Text>
      </S.Layout>
    </>
  );
};

export default AgreePolicy;

AgreePolicy.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

AgreePolicy.Layout.displayName = 'AgreePolicy';

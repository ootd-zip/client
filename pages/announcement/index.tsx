import AppBar from '@/components/Appbar';
import AnnouncementBlock from '@/components/Setting/AnnouncementBlock';
import { Title1 } from '@/components/UI';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export interface AnnoucementDataType {
  date: string;
  headline: string;
  newState: Boolean;
  body: string;
}

/*
이름: 공지사항 페이지
*/
export default function Announcement() {
  const router = useRouter();
  const [importantData, _setImportantData] = useState<AnnoucementDataType[]>([
    {
      date: '2024.05.14',
      headline: '안녕하세요 ootd.zip 입니다.',
      newState: true,
      body: '문의 사항은 이전 페이지에 있는 메일로 부탁드립니다!',
    },
  ]);
  const [data, _setData] = useState<AnnoucementDataType[]>([
    {
      date: '2024.05.14',
      headline: '여러분들의 옷을 저장해보세요',
      newState: true,
      body: '나한테 어떤 옷이 있었지? 내일 뭐 입지? 하지 말고 내 옷장을 채워보세요! 옷을 잘 입는 사람들은 어떤 브랜드, 사이즈의 옷을 입지? 하지 말고 다른 옷장을 구경해보세요! \n"옷을 저장할 수 있는 디지털 옷장 커뮤니티" ootd.zip',
    },
    {
      date: '2024.05.8',
      headline: '만든이들',
      newState: false,
      body: '프론트엔드 권낙현\n프론트엔드 정연휘\n백엔드 김강민\n백엔드 박진훈\n백엔드 박이언\n디자이너 이바름',
    },
  ]);

  return (
    <>
      <AppBar
        leftProps={<AiOutlineArrowLeft onClick={() => router.back()} />}
        middleProps={<Title1>공지사항</Title1>}
        rightProps={<></>}
      />
      {importantData.length > 0 && (
        <div
          style={{
            borderBottom: `8px solid ${theme.color.grey_95}`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {importantData.map((item, index) => {
            return (
              <AnnouncementBlock
                date={item.date}
                headline={item.headline}
                newState={item.newState}
                body={item.body}
                key={index}
                isLast={index === importantData.length - 1}
              />
            );
          })}
        </div>
      )}
      {data.map((item, index) => {
        return (
          <AnnouncementBlock
            date={item.date}
            headline={item.headline}
            newState={item.newState}
            body={item.body}
            key={index}
            isLast={index === data.length - 1}
          />
        );
      })}
    </>
  );
}

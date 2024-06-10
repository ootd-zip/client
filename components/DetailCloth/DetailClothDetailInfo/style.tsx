import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  padding: 16px 20px 32px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 8px solid ${(props) => props.theme.color.grey_95};
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const CategoryStart = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const InfoTitle = styled.div`
  display: flex;
  width: 65px;
  padding: 8px;
  align-items: center;
  gap: 8px;
`;

const ColorList = styled.div`
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  width: 375px;
  padding: 8px 8px 8px 4px;
`;

const ColorSpanLayout = styled.div`
  display: inline-flex;
  gap: 4px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
`;

interface ColorSpanProps {
  bgColor: string;
}

const ColorSpan = styled.div<ColorSpanProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: ${(props) =>
    props.bgColor === '#FFFFFF' && `1px solid ${props.theme.color.grey_90}`};
`;

const ColorName = styled.div``;

const S = {
  Layout,
  Category,
  CategoryStart,
  InfoTitle,
  ColorList,
  ColorSpanLayout,
  ColorSpan,
  ColorName,
};

export default S;

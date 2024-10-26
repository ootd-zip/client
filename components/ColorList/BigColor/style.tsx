import styled from 'styled-components';

interface ColorSpanProps {
  color: string;
  name: string;
}

const Layout = styled.div`
  height: 86px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ColorSpan = styled.div<ColorSpanProps>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.name === '화이트' && `2px solid ${props.theme.color.grey_90}`};
`;
const BigColorSpan = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface SmallColorSpanProps {
  color: string;
}
const SmallColorSpan = styled.div<SmallColorSpanProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: ${(props) => props.color};
`;

const XSmallColorSpan = styled.div<SmallColorSpanProps>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorName = styled.div``;
const S = {
  Layout,
  ColorSpan,
  ColorName,
  BigColorSpan,
  SmallColorSpan,
  XSmallColorSpan,
};

export default S;

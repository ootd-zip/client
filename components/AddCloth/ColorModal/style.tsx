import styled from 'styled-components';

interface ColorSpanProps {
  color: string;
  state: Boolean;
}

const Layout = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  .nextButton {
  }
`;
const Title = styled.div`
  padding: 21px 0;
`;
const ColorList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 4px;
`;
const Color = styled.div`
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
  ${(props) =>
    props.state &&
    `
    border: 2px solid black; 
  `}
`;
const ColorName = styled.div``;

const SelectedColorList = styled.div`
  width: 100%;
  padding: 16px 0;
  display: flex;
  gap: 8px;
  overflow-x: scroll;
`;

const SelectedColor = styled.div`
  border: 1px solid ${(props) => props.theme.color.grey_00};
  background-color: ${(props) => props.theme.color.grey_10};
  display: inline-flex;
  min-width: 68px;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 17px;
  h5 {
    padding: 8px 35px 8px 16px;
    color: ${(props) => props.theme.color.grey_100};
  }
  svg {
    color: ${(props) => props.theme.color.grey_100};
    position: absolute;
    right: 11px;
    width: 16px;
    height: 16px;
  }
`;

const S = {
  Layout,
  Title,
  ColorList,
  SelectedColorList,
  Color,
  ColorSpan,
  ColorName,
  SelectedColor,
};

export default S;
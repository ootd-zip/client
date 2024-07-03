import styled from 'styled-components';

const Layout = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 34px;
  background-color: ${(props) => props.theme.color.grey_90};
  flex-shrink: 0;
`;

interface SpanProps {
  state?: Boolean;
}

const Span = styled.div<SpanProps>`
  padding: 8px 16px;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme.color.grey_90};
  border-radius: 17px;
  ${(props) =>
    props.state &&
    `
      border:none;
      background-color: ${props.theme.color.grey_00};
      color: ${props.theme.color.grey_100};
  `}
`;

interface FilterSpanProps {
  state: Boolean;
}

const FilterSpan = styled.div<FilterSpanProps>`
  padding: 8px 28px 8px 16px;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme.color.grey_90};
  border-radius: 17px;
  position: relative;
  .down {
    position: absolute;
    right: 13px;
    bottom: 50%;
    transform: translate(0, 50%);
  }
  ${(props) =>
    props.state &&
    `
    padding: 8px 50px 8px 16px;
    color: ${props.theme.color.grey_100};
    background-color: ${props.theme.color.grey_00};
    .down {
        color: ${props.theme.color.grey_100};
    }
    border:none;
    .counter {
        position: absolute;
        right: 28px;
        bottom: 50%;
        transform: translate(0, 50%);
        background-color: ${props.theme.color.grey_100};
        color: ${props.theme.color.grey_00};
        border-radius: 50%;
        width: 16px;
        height: 16px;
        text-align: center;
    }
  `}
`;
interface ClothListScroll {
  state: Boolean;
}
const ClothList = styled.div<ClothListScroll>`
  height: calc(100vh - 246px);

  overflow-y: ${(prpos) => (prpos.state ? 'scroll' : 'hidden')};
`;

const Counter = styled.div``;

const S = {
  Layout,
  SearchFilter,
  Span,
  FilterSpan,
  Divider,
  Counter,
  ClothList,
};

export default S;

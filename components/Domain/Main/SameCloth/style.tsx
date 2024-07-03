import styled from 'styled-components';

interface FilterProps {
  state: Boolean;
}

const Layout = styled.div`
  .addButton {
    width: calc(100% - 20px);
    margin-bottom: 109px;
  }
`;

const Label = styled.div`
  .body {
    color: ${(props) => props.theme.color.grey_50};
    padding: 7px 0 28px 0;
  }
`;

const Filter = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 16px;
`;

const FilterItem = styled.div<FilterProps>`
  height: 56px;
  width: 56px;
  display: flex;
  gap: 6px;
  background-color: ${(props) => props.theme.color.grey_95};
  border-radius: 50%;

  .filterItemTrue {
    width: 100px;
    .category,
    .name {
      width: 90px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  img {
    object-fit: cover;
  }

  h5 {
    color: ${(props) => props.theme.color.grey_00};
  }

  p {
    color: ${(props) => props.theme.color.grey_50};
  }

  img {
    border-radius: 50%;
  }

  ${({ state }) =>
    state
      ? `
        width: 167px;
        border-radius: 200px; 
        .filterItemTrue {  
            display: flex;
            flex-direction: column;
            justify-content:center;
        }
    `
      : `
    .filterItemTrue { 
        display: none; 
}`}
`;

const List = styled.div`
  width: 100%;
  padding-right: 20px;
  margin-bottom: 28px;

  .flexList {
    margin-top: 6px;
    display: flex;
    gap: 6px;
    width: 100%;
    position: relative;
  }
`;

const FirstImage = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  padding-bottom: 100%;
`;

const FlexImage = styled.div`
  width: 32%;
  height: 0;
  padding-bottom: 32%;
  position: relative;
`;

const S = { Layout, Label, Filter, List, FilterItem, FirstImage, FlexImage };

export default S;

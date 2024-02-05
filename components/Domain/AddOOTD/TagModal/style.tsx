import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CategorySpanProps {
  state: Boolean;
}

interface LayoutProps {
  addTag: Boolean;
}

const Layout = styled.div`
  height: 80vh;
`;

const Background = styled.div<LayoutProps>`
  background-color: ${(props) => props.theme.color.grey_00};
  display: ${(props) => (props.addTag ? 'block' : 'none')};
  opacity: 0.3;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
`;

const MyCloset = styled.div`
  width: 100vw;
  padding: 16px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  display: flex;
  gap: 8px;
`;

const CategorySpan = styled.div<CategorySpanProps>`
  display: inline;
  background-color: ${(props) =>
    props.state ? props.theme.color.grey_00 : props.theme.color.grey_100};
  color: ${(props) =>
    !props.state ? props.theme.color.grey_00 : props.theme.color.grey_100};
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.color.grey_80};
  border-radius: 17px;
  flex-shrink: 0;
`;

interface IsOpenProps {
  state: Boolean;
}

const IsOpenSpan = styled.div<IsOpenProps>`
  display: inline;
  padding: 8px 16px;
  border-radius: 17px;
  background-color: ${(props) =>
    props.state ? props.theme.color.grey_00 : props.theme.color.grey_95};
  color: ${(props) =>
    !props.state ? props.theme.color.grey_00 : props.theme.color.grey_100};
  flex-shrink: 0;
  border: ${(props) =>
    !props.state && `1px solid ${props.theme.color.grey_90}`};
`;

const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: scroll;
  padding: 16px 0 24px 0;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 34px;
  background-color: #f2f2f2;
  flex-shrink: 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
  hr {
    color: ${(props) => props.theme.color.grey_90};
    width: 100%;
  }
`;

const S = {
  Layout,
  Background,
  Category,
  List,
  MyCloset,
  CategorySpan,
  IsOpenSpan,
  SearchFilter,
  Divider,
};

export default S;

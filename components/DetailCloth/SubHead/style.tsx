import styled from 'styled-components';

interface LayoutProps {
  state?: string;
}

const Layout = styled.div<LayoutProps>`
  display: flex;
  padding: ${(props) =>
    props.state ? '8px 0px 8px 0px' : '0px 20px 16px 20px'};

  justify-content: flex-end;
  align-items: center;
`;

const Frame = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const S = {
  Layout,
  Frame,
  Wrap,
};

export default S;

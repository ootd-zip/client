import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const Category = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const BodyInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const OpenStatus = styled.div`
  display: inline-flex;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
  gap: 4px;
  width: 100%;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CaptionLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${(props) => props.theme.color.grey_50};

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
`;

const S = { Layout, Category, BodyInfo, OpenStatus, Wrap, CaptionLayout, Icon };

export default S;

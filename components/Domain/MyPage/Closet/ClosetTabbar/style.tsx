import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.color.grey_90};
  justify-content: space-around;
  a {
    width: 50%;
  }
`;
const OOTD = styled.div`
  text-align: center;
  padding: 13px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Closet = styled(OOTD)`
  text-align: center;
  padding: 13px 0;
`;

const Hr = styled.hr`
  width: 34px;
  position: absolute;
  bottom: 0;
  margin: 0;
  background-color: black;
  border: 1px solid black;
`;

const S = { Layout, OOTD, Closet, Hr };

export default S;

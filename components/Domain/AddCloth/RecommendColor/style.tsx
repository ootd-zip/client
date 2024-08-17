import styled from 'styled-components';

const Layout = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 11px;
  background-color: ${(props) => props.theme.color.grey_95};
  padding: 8px 12px;
`;

const Button = styled.button`
  position: absolute;
  right: 12px;
  border-radius: 12px;
  padding: 2px 16px;
  background-color: ${(props) => props.theme.color.grey_00};
  color: ${(props) => props.theme.color.grey_100};
`;

const Color = styled.div`
  flex-grow: 1;
`;

const S = { Layout, Button, Color };

export default S;

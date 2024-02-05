import styled from 'styled-components';

const Layout = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
`;
const Text = styled.div`
  .helper {
    color: ${(props) => props.theme.color.grey_50};
    margin: 16px 0;
  }
`;
const AddClothButton = styled.button`
  padding: 8px 24px;
  border: 1px solid ${(props) => props.theme.color.grey_00};
  border-radius: 2px;
  color: ${(props) => props.theme.color.grey_00};
`;
const S = { Layout, Text, AddClothButton };

export default S;

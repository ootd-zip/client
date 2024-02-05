import styled from 'styled-components';

interface Body3State {
  state?: string;
}

const Body3 = styled.p<Body3State>`
  font-weight: ${({ theme }) => theme.weight.regular}; //400
  font-size: ${({ theme }) => theme.fontSize.base}; //14px
  line-height: ${({ theme }) => theme.lineHeight.md}; //18px
  letter-spacing: ${({ theme }) => theme.spacing.default}; //0%

  ${(props) =>
    props.state === 'emphasis' &&
    `
    font-weight: ${props.theme.weight.semibold};  
  `}
  ${(props) =>
    props.state === 'underline' &&
    `
      text-decoration: underline;
  `}
  ${(props) =>
    props.state === 'center' &&
    `
      text-align: center;
  `}
`;

export default Body3;

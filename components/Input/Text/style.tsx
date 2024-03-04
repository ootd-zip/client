import styled from 'styled-components';

interface LayoutProps {
  size: 'big' | 'small';
  line: 'underline' | 'outline';
}

interface InputProps {
  line: 'underline' | 'outline';
  type?: 'Link' | 'number';
}

const Layout = styled.div<LayoutProps>`
  display: inline-flex;
  width: 100%;
  max-width: ${(props) => (props.size === 'big' ? '350px' : '167px')};
  height: 44px;
  gap: 2px;
  position: relative;

  ${(props) =>
    props.line === 'underline' &&
    `
  border-bottom: 2px solid ${props.theme.color.grey_80};
  &:hover {
    border-bottom: 2px solid ${props.theme.color.grey_00};
  }
  `}

  ${(props) =>
    props.line === 'outline' &&
    ` 
  border: 1px solid ${props.theme.color.grey_80};
  &:hover {
    border: 1px solid ${props.theme.color.grey_00};
  }
  `}
`;

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled(FlexLayout)`
  svg {
    width: 18.75px;
    height: 18.75px;
  }
`;

const SearchInput = styled(FlexLayout)`
  flex-grow: 1;
`;

const Input = styled.input<InputProps>`
  font-family: 'Pretendard Regular';
  text-decoration: ${(props) =>
    props.type === 'Link' ? '1px solid underline' : ''};
  ${(props) =>
    props.line === 'underline' &&
    `
    width: 100%;
    border: none;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px; 

    :focus {
      outline: none;
    }

    &::placeholder {
      font-size: 16px;
      font-family: 'Pretendard Variable';
    }
  `}

  ${(props) =>
    props.line === 'outline' &&
    `
    padding: ${props.type === 'Link' ? '0 16px 0 42px' : '0 16px'};
    width: 100%;
    border: none; 
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; 
    :focus {
      outline: none;
    }
    &::placeholder {
      font-size: 16px;
      font-family: 'Pretendard Variable';
      font-weight: 400;
      line-height: 22px;
    }
  `}
`;

const CloseIcon = styled(FlexLayout)<InputProps>`
  align-items: center;
  display: flex;
  width: 24px;
  svg {
    width: 12px;
    height: 12px;
  }
  ${(props) =>
    props.line === 'outline' &&
    `
    padding-right: 8px;
  `}
`;

const Unit = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 2px;
`;

interface LinkIconProps {
  state: Boolean;
}

const LinkIcon = styled.div<LinkIconProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 100%;
  left: 16px;

  svg {
    color: ${(props) =>
      props.state ? props.theme.color.grey_00 : props.theme.color.grey_80};
    width: 24px;
    height: 24px;
  }
`;

const S = { Layout, LinkIcon, SearchIcon, SearchInput, Input, CloseIcon, Unit };

export default S;

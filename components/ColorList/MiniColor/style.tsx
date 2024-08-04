import styled from 'styled-components';

const MiniColorLayout = styled.div`
  display: flex;
  gap: 5px;
  padding: 3px;
  align-items: center;
`;

interface MiniColorSpanProps {
  color: string;
}

const MiniColorSpan = styled.span<MiniColorSpanProps>`
  width: 14px;
  height: 14px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const MiniColorName = styled.div``;

const S = { MiniColorLayout, MiniColorSpan, MiniColorName };

export default S;

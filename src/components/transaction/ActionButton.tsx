import styled from "@emotion/styled";

const ActionButton = styled.button<{ danger?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ danger }) => (danger ? "#f9c9c9" : "#e8e6e0")};
  background: ${({ danger }) => (danger ? "#fff5f5" : "#faf9f6")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: all 0.15s;
`;

export default ActionButton;

import styled from "@emotion/styled";
import Plot_colors from "../styles/color";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <UpdateText>강세아님, 오늘의 예산 PLOT이 업데이트되었습니다.</UpdateText>
      <button onClick={() => navigate("/ai-guide")}>AI 가이드</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 48px;
  background-color: ${Plot_colors.gray[97]};
  border-bottom: 1px solid #e9e4df;

  button {
    background-color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const UpdateText = styled.span`
  color: ${Plot_colors.green[58]};
`;

export default Header;

import styled from "@emotion/styled";
import Remove from "../assets/Remove.svg";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { label: "HOME", path: "/" },
  { label: "수입/지출 내역", path: "/history" },
  { label: "랭킹", path: "/ranking" },
  { label: "AI 미래 활동 가이드", path: "/ai-guide" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <h2>PLOT</h2>
      <MenuContainer>
        {menuItems.map((item) => (
          <MenuButton
            key={item.label}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </MenuButton>
        ))}
      </MenuContainer>
      <RemoveBox>
        <img src={Remove} alt="삭제" />
        로그아웃
      </RemoveBox>
    </Container>
  );
};

const Container = styled.div`
  background-color: #e9e4df;
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 28px 24px;

  span {
    font-size: 14px;
    font-weight: bold;
  }

  h2 {
    font-weight: bold;
    font-size: large;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 14px;
`;

const MenuButton = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: start;
  padding: 12px 0 12px 12px;
  font-size: 14px;
  font-weight: bold;
  background-color: ${({ isActive }) => (isActive ? "white" : "transparent")};
  border: none;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const RemoveBox = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(0, 0, 0, 0.5);
  align-self: flex-start;
`;

export default Sidebar;

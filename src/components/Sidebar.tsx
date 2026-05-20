import styled from "@emotion/styled";
import { useState } from "react";
import Remove from "../assets/Remove.svg";

const menuItems = ["HOME", "수입/지출 내역", "랭킹", "AI 미래 활동 가이드"];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("HOME");

  return (
    <Container>
      <h2>PLOT</h2>
      <MenuContainer>
        {menuItems.map((item) => (
          <MenuButton
            key={item}
            isActive={activeMenu === item}
            onClick={() => setActiveMenu(item)}
          >
            {item}
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

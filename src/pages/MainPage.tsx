import styled from "@emotion/styled";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const MainPage = () => {
  return (
    <Body>
      <Content>
        <Sidebar />
        <Main>
          <Header />
        </Main>
      </Content>
    </Body>
  );
};

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
`;
export default MainPage;

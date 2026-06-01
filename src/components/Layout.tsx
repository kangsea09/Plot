import styled from "@emotion/styled";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Body>
    <Content>
      <Sidebar />
      <Main>
        <Header />
        {children}
      </Main>
    </Content>
  </Body>
);

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
  background: #f5f3ee;
`;

export default Layout;

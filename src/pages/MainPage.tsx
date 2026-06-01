import styled from "@emotion/styled";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import PageHeader from "../components/PageHeader";

const MainPage = () => (
  <Layout>
    <Container>
      <PageHeader label="PLOT DASHBOARD" title="이번 달 돈의 흐름을 한눈에" />
      <Dashboard />
    </Container>
  </Layout>
);

const Container = styled.div`
  background: #f5f3ee;
  padding: 40px 32px;
`;

export default MainPage;

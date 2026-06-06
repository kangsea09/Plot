import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import styled from "@emotion/styled";

const RankingPage = () => (
  <Layout>
    <Container>
      <PageHeader
        label="MONTHLY RANKING"
        title="당월 카테고리별 사용자 랭킹"
        desc="같은 카테고리 안에서 사용자의 지출 규모와 절약률을 비교해 이번 달 소비 위치를 확인합니다."
      />
    </Container>
  </Layout>
);

const Container = styled.div`
  padding: 40px 32px;
`;

export default RankingPage;

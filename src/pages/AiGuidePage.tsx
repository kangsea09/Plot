import styled from "@emotion/styled";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

const AiGuidePage = () => (
  <Layout>
    <Container>
      <PageHeader
        label="AI FUTURE GUIDE"
        title="미래 일정 기반 소비 가이드"
        desc="등록한 미래 이벤트를 분석해 예상 지출 규모를 계산하고, 대비를 위한 저축 및 소비 조절 가이드를 제공합니다."
      />
    </Container>
  </Layout>
);

const Container = styled.div`
  padding: 40px 32px;
`;

export default AiGuidePage;

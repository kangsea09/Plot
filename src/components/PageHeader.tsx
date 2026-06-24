import styled from "@emotion/styled";

interface PageHeaderProps {
  label?: string;
  title: string;
  desc?: string;
}

const PageHeader = ({ label, title, desc }: PageHeaderProps) => {
  return (
    <Container>
      <div>
        {label && <LedgerLabel>{label}</LedgerLabel>}
        <PageTitle>{title}</PageTitle>
        {desc && <PageDesc>{desc}</PageDesc>}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LedgerLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #2e7d32;
  letter-spacing: 3px;
  margin-bottom: 6px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.15;
`;

const PageDesc = styled.p`
  margin-top: 10px;
  color: #888;
  font-size: 13px;
`;

export default PageHeader;

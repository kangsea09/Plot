import styled from "@emotion/styled";
import type { Summary } from "../../hooks/useSummary";

interface Props {
  summary: Summary;
}

const SummaryCards = ({
  summary: { totalIncome, totalExpense, balance },
}: Props) => (
  <SummaryRow>
    <SummaryCard>
      <SummaryLabel>총 수입</SummaryLabel>
      <SummaryAmount income>
        +{totalIncome.toLocaleString("ko-KR")}원
      </SummaryAmount>
    </SummaryCard>
    <SummaryCard>
      <SummaryLabel>총 지출</SummaryLabel>
      <SummaryAmount>-{totalExpense.toLocaleString("ko-KR")}원</SummaryAmount>
    </SummaryCard>
    <SummaryCard accent={balance >= 0 ? "income" : "expense"}>
      <SummaryLabel>잔액</SummaryLabel>
      <SummaryAmount income={balance >= 0}>
        {balance >= 0 ? "+" : "-"}
        {Math.abs(balance).toLocaleString("ko-KR")}원
      </SummaryAmount>
    </SummaryCard>
  </SummaryRow>
);

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div<{ accent?: "income" | "expense" }>`
  background: #fff;
  border-radius: 16px;
  padding: 20px 24px;
  border: 1px solid
    ${({ accent }) =>
      accent === "income"
        ? "#c8e6c9"
        : accent === "expense"
          ? "#ffcdd2"
          : "#e8e6e0"};
`;

const SummaryLabel = styled.p`
  font-size: 13px;
  color: #999;
  margin: 0 0 8px;
`;

const SummaryAmount = styled.p<{ income?: boolean }>`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: ${({ income }) => (income ? "#2E7D32" : "#C62828")};
`;

export default SummaryCards;

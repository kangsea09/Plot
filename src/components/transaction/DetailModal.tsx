import styled from "@emotion/styled";
import type { Transaction } from "../../types/transaction";
import { CATEGORY_COLORS } from "../../data/transactions";

const formatAmount = (amount: number) => {
  const abs = Math.abs(amount).toLocaleString("ko-KR");
  return amount > 0 ? `+${abs}원` : `-${abs}원`;
};

interface Props {
  transaction: Transaction;
  onClose: () => void;
}

const DetailModal = ({ transaction, onClose }: Props) => {
  const color = CATEGORY_COLORS[transaction.category];

  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{transaction.title}</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Header>

        <Col>
          <Row>
            <Label>분류</Label>
            <Badge bg={color.bg} color={color.text}>
              {transaction.category}
            </Badge>
          </Row>
          <Row>
            <Label>날짜</Label>
            <span>{transaction.date}</span>
          </Row>
          <Row>
            <Label>금액</Label>
            <Amount positive={transaction.amount > 0}>
              {formatAmount(transaction.amount)}
            </Amount>
          </Row>
          {transaction.memo && (
            <Row>
              <Label>메모</Label>
              <span>{transaction.memo}</span>
            </Row>
          )}
        </Col>
      </Box>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  min-width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  color: #555;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.span`
  color: #999;
`;
const Badge = styled.span<{ bg: string; color: string }>`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border-radius: 20px;
  padding: 2px 12px;
  font-size: 12px;
  font-weight: 600;
`;
const Amount = styled.span<{ positive: boolean }>`
  font-weight: 700;
  font-size: 16px;
  color: ${({ positive }) => (positive ? "#2E7D32" : "#C62828")};
`;

export default DetailModal;

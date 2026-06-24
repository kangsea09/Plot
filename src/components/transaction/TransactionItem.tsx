import styled from "@emotion/styled";
import ActionButton from "./ActionButton";
import { formatAmount } from "../../utils/formatCurrency";
import { CATEGORY_COLORS } from "../../data/transactions";
import type { Transaction } from "../../types/transaction";

interface Props {
  transaction: Transaction;
  onView: (t: Transaction) => void;
  onEdit: (t: Transaction) => void;
  onDelete: (id: number) => void;
}

const TransactionItem = ({
  transaction: t,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  const color = CATEGORY_COLORS[t.category];

  return (
    <Item onClick={() => onView(t)}>
      <ItemTop>
        <strong>{t.title}</strong>
        <Amount positive={t.amount > 0}>{formatAmount(t.amount)}</Amount>
      </ItemTop>
      <ItemBottom>
        <Badge bg={color.bg} color={color.text}>
          {t.category}
        </Badge>
        <DateText>{t.date}</DateText>
        <Memo>{t.memo}</Memo>
      </ItemBottom>
      <BtnGroup>
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(t);
          }}
        >
          ✏️
        </ActionButton>
        <ActionButton
          danger
          onClick={(e) => {
            e.stopPropagation();
            onDelete(t.id);
          }}
        >
          🗑
        </ActionButton>
      </BtnGroup>
    </Item>
  );
};

const Item = styled.div`
  padding: 18px 0;
  border-bottom: 1px solid #f0ede6;
  cursor: pointer;
`;

const ItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ItemBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Amount = styled.span<{ positive: boolean }>`
  font-weight: 700;
  font-size: 15px;
  color: ${({ positive }) => (positive ? "#2E7D32" : "#C62828")};
`;

const Badge = styled.span<{ bg: string; color: string }>`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
`;

const DateText = styled.span`
  font-size: 13px;
  color: #999;
`;

const Memo = styled.span`
  font-size: 12px;
  color: #bbb;
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export default TransactionItem;

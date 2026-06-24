import styled from "@emotion/styled";
import { useState } from "react";
import type { Transaction, Category } from "../../types/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../data/transactions";

interface Props {
  transaction: Transaction;
  onClose: () => void;
  onSave: (updated: Transaction) => void;
}

const EditModal = ({ transaction, onClose, onSave }: Props) => {
  const [form, setForm] = useState({ ...transaction });

  const set = (field: Partial<Transaction>) => {
    setForm((prev) => ({ ...prev, ...field }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  const handleAmountChange = (value: string) => {
    const num = Number(value.replace(/[^0-9]/g, ""));
    set({ amount: form.type === "지출" ? -num : num });
  };

  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>내역 수정</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Header>

        <Col>
          <Input
            value={form.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="항목명"
          />
          <Select
            value={form.category}
            onChange={(e) => set({ category: e.target.value as Category })}
          >
            {(form.type === "수입"
              ? INCOME_CATEGORIES
              : EXPENSE_CATEGORIES
            ).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Input
            type="number"
            min="0"
            inputMode="numeric"
            value={Math.abs(form.amount)}
            onChange={(e) => {
              const sanitized = e.target.value.replace(/[^0-9]/g, "");
              handleAmountChange(sanitized);
            }}
            placeholder="금액"
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => set({ date: e.target.value })}
          />
          <Textarea
            value={form.memo}
            onChange={(e) => set({ memo: e.target.value })}
            placeholder="메모"
          />
          <SaveBtn onClick={handleSave}>저장</SaveBtn>
        </Col>
      </Box>
    </Overlay>
  );
};

const field = `
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1.5px solid #e8e6e0;
  background: #faf9f6;
  font-size: 14px;
  color: #1a1a1a;
  outline: none;
  box-sizing: border-box;
`;

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
  min-width: 340px;
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
`;

const Input = styled.input`
  ${field}
`;

const Select = styled.select`
  ${field}
`;

const Textarea = styled.textarea`
  ${field}
  height: 80px;
  resize: none;
`;

const SaveBtn = styled.button`
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
`;

export default EditModal;

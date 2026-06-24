import styled from "@emotion/styled";
import type { Category } from "../../types/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../data/transactions";

interface FormState {
  title: string;
  amount: string;
  category: Category;
  date: string;
  memo: string;
}

interface Props {
  tab: "지출" | "수입";
  form: FormState;
  onTabChange: (tab: "지출" | "수입") => void;
  onFormChange: (fields: Partial<FormState>) => void;
  onAdd: () => void;
}

const AddForm = ({ tab, form, onTabChange, onFormChange, onAdd }: Props) => (
  <Panel>
    <Title>내역 추가</Title>

    <TabRow>
      {(["지출", "수입"] as const).map((t) => (
        <TabBtn key={t} active={tab === t} onClick={() => onTabChange(t)}>
          {t}
        </TabBtn>
      ))}
    </TabRow>

    <Col>
      <Input
        value={form.title}
        onChange={(e) => onFormChange({ title: e.target.value })}
        placeholder="항목명"
      />
      <Input
        type="number"
        min="0"
        inputMode="numeric"
        value={form.amount}
        onChange={(e) => {
          const sanitized = e.target.value.replace(/[^0-9]/g, "");
          onFormChange({ amount: sanitized });
        }}
        placeholder="금액"
      />
      <Select
        value={form.category}
        onChange={(e) => onFormChange({ category: e.target.value as Category })}
      >
        {(tab === "수입" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Input
        type="date"
        value={form.date}
        onChange={(e) => onFormChange({ date: e.target.value })}
      />
      <Textarea
        value={form.memo}
        onChange={(e) => onFormChange({ memo: e.target.value })}
        placeholder="메모"
      />
      <AddBtn onClick={onAdd}>내역 추가</AddBtn>
    </Col>
  </Panel>
);

const Panel = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid #e8e6e0;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 16px;
`;

const TabRow = styled.div`
  display: flex;
  background: #f5f3ee;
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 20px;
`;

const TabBtn = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  border: none;
  background: ${({ active }) => (active ? "#fff" : "transparent")};
  color: ${({ active }) => (active ? "#1a1a1a" : "#999")};
  font-weight: ${({ active }) => (active ? 700 : 400)};
  font-size: 14px;
  cursor: pointer;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

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

const Input = styled.input`
  ${field}
`;
const Select = styled.select`
  ${field}
`;
const Textarea = styled.textarea`
  ${field}
  height: 90px;
  resize: none;
`;

const AddBtn = styled.button`
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 15px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
`;

export default AddForm;

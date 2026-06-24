import { useState } from "react";
import styled from "@emotion/styled";
import type { Category } from "../types/transaction";

// "전체"는 개별 예산이 없으므로 제외
type BudgetCategory = Exclude<Category, "전체">;

export type BudgetMap = Record<BudgetCategory, number>;

interface Props {
  initialBudgets: BudgetMap;
  onSave: (budgets: BudgetMap) => void;
  onClose: () => void;
}

const BUDGET_CATEGORIES: BudgetCategory[] = [
  "식비",
  "쇼핑/여가",
  "교통/차량",
  "문화",
  "뷰티/미용",
  "수입",
  "부수입",
  "월급",
  "용돈",
  "기타",
];

const BudgetSettingModal = ({ initialBudgets, onSave, onClose }: Props) => {
  const [localBudgets, setLocalBudgets] = useState<BudgetMap>({
    ...initialBudgets,
  });

  const handleChange = (category: BudgetCategory, value: string) => {
    const numeric = Number(value.replace(/[^0-9]/g, ""));
    setLocalBudgets((prev) => ({ ...prev, [category]: numeric }));
  };

  const handleSave = () => {
    onSave(localBudgets);
    onClose();
  };

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>카테고리별 예산 설정</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          {BUDGET_CATEGORIES.map((cat) => (
            <Row key={cat}>
              <Label>{cat}</Label>
              <InputWrapper>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={localBudgets[cat].toLocaleString()}
                  onChange={(e) => handleChange(cat, e.target.value)}
                  placeholder="0"
                />
                <Unit>원</Unit>
              </InputWrapper>
            </Row>
          ))}
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </ModalFooter>
      </Modal>
    </Backdrop>
  );
};

// --- Styled Components ---

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 420px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #1f2937;
  }
`;

const ModalBody = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 60vh;
  overflow-y: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Label = styled.span`
  font-size: 15px;
  color: #374151;
  font-weight: 500;
  min-width: 90px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  text-align: right;
  color: #1f2937;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`;

const Unit = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px 24px 20px;
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #4b5563;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export default BudgetSettingModal;

import styled from "@emotion/styled";
import { useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import DetailModal from "../components/transaction/DetailModal";
import EditModal from "../components/transaction/EditModal";
import ActionButton from "../components/transaction/ActionButton";
import useTransactions from "../hooks/useTransactions";
import type { Transaction, Category } from "../types/transaction";
import { CATEGORIES, CATEGORY_COLORS } from "../data/transactions";

const HistoryPage = () => {
  const {
    tab,
    setTab,
    form,
    setFormField,
    filtered,
    handleAdd,
    handleDelete,
    handleSave,
  } = useTransactions();
  const [viewModal, setViewModal] = useState<Transaction | null>(null);
  const [editModal, setEditModal] = useState<Transaction | null>(null);

  const formatAmount = (amount: number) => {
    const abs = Math.abs(amount).toLocaleString("ko-KR");
    return amount > 0 ? `+${abs}원` : `-${abs}원`;
  };

  return (
    <Layout>
      <Container>
        <PageHeader
          label="LEDGER"
          title="수입/지출 내역 관리"
          desc="이번 달 예산, 잘 지켜내고 있을까요? 카테고리별 수입과 지출 내역을 보여드릴게요"
        />

        <Wrap>
          {/* 내역 추가 */}
          <Panel>
            <Title>내역 추가</Title>

            <TabRow>
              {(["지출", "수입"] as const).map((t) => (
                <TabBtn key={t} active={tab === t} onClick={() => setTab(t)}>
                  {t}
                </TabBtn>
              ))}
            </TabRow>

            <Col>
              <Input
                value={form.title}
                onChange={(e) => setFormField({ title: e.target.value })}
                placeholder="항목명"
              />
              <Input
                type="number"
                value={form.amount}
                onChange={(e) => setFormField({ amount: e.target.value })}
                placeholder="금액"
              />
              <Select
                value={form.category}
                onChange={(e) =>
                  setFormField({ category: e.target.value as Category })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setFormField({ date: e.target.value })}
              />
              <Textarea
                value={form.memo}
                onChange={(e) => setFormField({ memo: e.target.value })}
                placeholder="메모"
              />
              <AddBtn onClick={handleAdd}>내역 추가</AddBtn>
            </Col>
          </Panel>

          {/* 내역 목록 */}
          <ListPanel>
            {filtered.length === 0 ? (
              <Empty>내역이 없습니다.</Empty>
            ) : (
              filtered.map((t) => {
                const color = CATEGORY_COLORS[t.category];
                return (
                  <Item key={t.id}>
                    <ItemTop>
                      <strong>{t.title}</strong>
                      <Amount positive={t.amount > 0}>
                        {formatAmount(t.amount)}
                      </Amount>
                    </ItemTop>
                    <ItemBottom>
                      <Badge bg={color.bg} color={color.text}>
                        {t.category}
                      </Badge>
                      <Date>{t.date}</Date>
                      <Memo>{t.memo}</Memo>
                    </ItemBottom>
                    <BtnGroup>
                      <ActionButton onClick={() => setViewModal(t)}>
                        👁
                      </ActionButton>
                      <ActionButton onClick={() => setEditModal(t)}>
                        ✏️
                      </ActionButton>
                      <ActionButton danger onClick={() => handleDelete(t.id)}>
                        🗑
                      </ActionButton>
                    </BtnGroup>
                  </Item>
                );
              })
            )}
          </ListPanel>
        </Wrap>

        {viewModal && (
          <DetailModal
            transaction={viewModal}
            onClose={() => setViewModal(null)}
          />
        )}
        {editModal && (
          <EditModal
            transaction={editModal}
            onClose={() => setEditModal(null)}
            onSave={handleSave}
          />
        )}
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: #f5f3ee;
  padding: 40px 32px;
`;

const Wrap = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

const Panel = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid #e8e6e0;
  flex: 1;
`;

const ListPanel = styled(Panel)`
  max-height: calc(100vh - 180px);
  overflow-y: auto;
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

const Item = styled.div`
  padding: 18px 0;
  border-bottom: 1px solid #f0ede6;
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

const Date = styled.span`
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

const Empty = styled.div`
  text-align: center;
  color: #bbb;
  padding: 40px 0;
  font-size: 14px;
`;

export default HistoryPage;

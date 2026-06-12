import styled from "@emotion/styled";
import { useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import DetailModal from "../components/transaction/DetailModal";
import EditModal from "../components/transaction/EditModal";
import SummaryCards from "../components/transaction/SummaryCard";
import AddForm from "../components/transaction/AddForm";
import TransactionItem from "../components/transaction/TransactionItem";
import useTransactions from "../hooks/useTransactions";
import useSummary from "../hooks/useSummary";
import type { Transaction } from "../types/transaction";

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

  const summary = useSummary(filtered);

  const [viewModal, setViewModal] = useState<Transaction | null>(null);
  const [editModal, setEditModal] = useState<Transaction | null>(null);

  return (
    <Layout>
      <Container>
        <PageHeader
          label="LEDGER"
          title="수입/지출 내역 관리"
          desc="이번 달 예산, 잘 지켜내고 있을까요? 카테고리별 수입과 지출 내역을 보여드릴게요"
        />

        <SummaryCards summary={summary} />

        <Wrap>
          <AddForm
            tab={tab}
            form={form}
            onTabChange={setTab}
            onFormChange={setFormField}
            onAdd={handleAdd}
          />

          <ListPanel>
            {filtered.length === 0 ? (
              <Empty>내역이 없습니다.</Empty>
            ) : (
              filtered.map((t) => (
                <TransactionItem
                  key={t.id}
                  transaction={t}
                  onView={setViewModal}
                  onEdit={setEditModal}
                  onDelete={handleDelete}
                />
              ))
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

const ListPanel = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid #e8e6e0;
  flex: 1;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
`;

const Empty = styled.div`
  text-align: center;
  color: #bbb;
  padding: 40px 0;
  font-size: 14px;
`;

export default HistoryPage;

import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import BudgetSettingModal from "../components/BudgetSettingModal";
import type { BudgetMap } from "../components/BudgetSettingModal";
import type { Category } from "../types/transaction";
import PageHeader from "../components/PageHeader";
import styled from "@emotion/styled";

// --- 타입 정의 ---

type BudgetCategory = Exclude<Category, "전체">;

interface RankingItem {
  rank: number;
  userName: string;
  amount: number;
  budget: number;
  usageRate: number;
  isCurrentUser?: boolean;
}

// --- 상수 ---

const CATEGORIES: Category[] = [
  "전체",
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

const DEFAULT_BUDGETS: BudgetMap = {
  식비: 300000,
  "쇼핑/여가": 200000,
  "교통/차량": 100000,
  문화: 100000,
  "뷰티/미용": 100000,
  수입: 0,
  부수입: 0,
  월급: 0,
  용돈: 0,
  기타: 100000,
};

// amount와 budget을 받아 usageRate를 계산하는 헬퍼
const calcRate = (amount: number, budget: number) =>
  budget > 0 ? Math.round((amount / budget) * 100) : 0;

const calcTotalBudget = (budgets: BudgetMap) =>
  Object.values(budgets).reduce((total, value) => total + value, 0);

// 더미 지출 데이터 (amount만 고정, budget/usageRate는 동적 계산)
const RAW_SPENDING: Record<
  Category,
  { userName: string; amount: number; isCurrentUser?: boolean }[]
> = {
  전체: [
    { userName: "김절약", amount: 240000 },
    { userName: "이소비", amount: 450000 },
    { userName: "강세아", amount: 420000, isCurrentUser: true },
    { userName: "박가성비", amount: 550000 },
  ],
  식비: [
    { userName: "밥도둑", amount: 150000 },
    { userName: "강세아", amount: 180000, isCurrentUser: true },
    { userName: "요리왕", amount: 350000 },
    { userName: "프로외식러", amount: 1200000 },
  ],
  "뷰티/미용": [],
  문화: [],
  "쇼핑/여가": [],
  수입: [],
  부수입: [],
  월급: [],
  용돈: [],
  "교통/차량": [],
  기타: [],
};

// 전체 카테고리용 고정 예산 (개인 설정과 무관)
const TOTAL_FIXED_BUDGETS: Record<string, number> = {
  김절약: 600000,
  이소비: 700000,
  강세아: 500000,
  박가성비: 500000,
};

// --- 컴포넌트 ---

const RankingPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState<BudgetMap>(DEFAULT_BUDGETS);

  const rankings = useMemo<Record<Category, RankingItem[]>>(() => {
    const result = {} as Record<Category, RankingItem[]>;

    for (const category of CATEGORIES) {
      const raw = RAW_SPENDING[category];

      if (category === "전체") {
        const totalBudget = calcTotalBudget(budgets);
        result[category] = raw
          .map((item) => {
            const budget = item.isCurrentUser
              ? totalBudget
              : (TOTAL_FIXED_BUDGETS[item.userName] ?? 0);
            const usageRate = calcRate(item.amount, budget);
            return { ...item, budget, usageRate };
          })
          .sort((a, b) => a.usageRate - b.usageRate)
          .map((item, i) => ({ ...item, rank: i + 1 }));
      } else {
        result[category] = raw
          .map((item) => {
            const budget = item.isCurrentUser
              ? (budgets[category as BudgetCategory] ?? 0)
              : (DEFAULT_BUDGETS[category as BudgetCategory] ?? 0);
            return {
              ...item,
              budget,
              usageRate: calcRate(item.amount, budget),
            };
          })
          .sort((a, b) => a.usageRate - b.usageRate)
          .map((item, i) => ({ ...item, rank: i + 1 }));
      }
    }

    return result;
  }, [budgets]);

  const currentRankings = rankings[activeCategory];

  return (
    <Layout>
      <Container>
        <PageHeader
          label="MONTHLY RANKING"
          title="당월 카테고리별 사용자 랭킹"
          desc="자신이 설정한 카테고리별 예산 한도 내에서 누가 더 소비를 잘 참아냈는지 겨뤄보세요"
        />

        <TabContainer>
          {CATEGORIES.map((category) => (
            <TabButton
              key={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </TabButton>
          ))}

          <BudgetSettingButton onClick={() => setIsModalOpen(true)}>
            ⚙️ 예산 설정
          </BudgetSettingButton>
        </TabContainer>

        <RankingSection>
          <ListHeader>
            <HeaderCell width="10%">순위</HeaderCell>
            <HeaderCell width="25%">사용자</HeaderCell>
            <HeaderCell width="30%">실제 지출 / 설정 예산</HeaderCell>
            <HeaderCell width="35%">카테고리 예산 소진율</HeaderCell>
          </ListHeader>

          {currentRankings.length > 0 ? (
            <ListBody>
              {currentRankings.map((item) => {
                const isOverBudget = item.usageRate > 100;
                return (
                  <Row key={item.rank} isCurrentUser={item.isCurrentUser}>
                    <RankCell width="10%" rank={item.rank}>
                      {item.rank === 1
                        ? "🥇"
                        : item.rank === 2
                          ? "🥈"
                          : item.rank === 3
                            ? "🥉"
                            : item.rank}
                    </RankCell>
                    <Cell
                      width="25%"
                      fontWeight={item.isCurrentUser ? "bold" : "normal"}
                    >
                      {item.userName}
                    </Cell>
                    <Cell width="30%">
                      <AmountText>{item.amount.toLocaleString()}원</AmountText>
                      <BudgetText>
                        {" "}
                        / {item.budget.toLocaleString()}원
                      </BudgetText>
                    </Cell>
                    <RatioCell width="35%">
                      <RatioText isOverBudget={isOverBudget}>
                        {item.usageRate}% {isOverBudget && "⚠️"}
                      </RatioText>
                      <ProgressBarWrapper>
                        <ProgressBar
                          percent={Math.min(item.usageRate, 100)}
                          isCurrentUser={item.isCurrentUser}
                          isOverBudget={isOverBudget}
                        />
                      </ProgressBarWrapper>
                    </RatioCell>
                  </Row>
                );
              })}
            </ListBody>
          ) : (
            <EmptyState>이 카테고리는 아직 랭킹 데이터가 없습니다.</EmptyState>
          )}
        </RankingSection>
      </Container>

      {isModalOpen && (
        <BudgetSettingModal
          initialBudgets={budgets}
          onSave={setBudgets}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Layout>
  );
};

// --- Styled Components (기존과 동일) ---

const Container = styled.div`
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  font-size: 15px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  color: ${({ isActive }) => (isActive ? "#2563eb" : "#4b5563")};
  background: ${({ isActive }) => (isActive ? "#eff6ff" : "transparent")};
  border: 1px solid ${({ isActive }) => (isActive ? "#2563eb" : "transparent")};
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${({ isActive }) => (isActive ? "#eff6ff" : "#f3f4f6")};
  }
`;

const RankingSection = styled.div`
  margin-top: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: flex;
  background: #f9fafb;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderCell = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-align: center;
`;

const ListBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div<{ isCurrentUser?: boolean }>`
  display: flex;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid #f3f4f6;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? "#f0fdf4" : "transparent"};
  transition: background-color 0.15s ease;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ isCurrentUser }) =>
      isCurrentUser ? "#f0fdf4" : "#f9fafb"};
  }
`;

const Cell = styled.div<{ width: string; color?: string; fontWeight?: string }>`
  width: ${({ width }) => width};
  font-size: 15px;
  text-align: center;
  color: ${({ color }) => color || "#1f2937"};
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
`;

const RankCell = styled(Cell)<{ rank: number }>`
  font-weight: bold;
  font-size: ${({ rank }) => (rank <= 3 ? "18px" : "15px")};
`;

const AmountText = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const BudgetText = styled.span`
  color: #9ca3af;
  font-size: 14px;
`;

const RatioCell = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const RatioText = styled.span<{ isOverBudget: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ isOverBudget }) => (isOverBudget ? "#ef4444" : "#4b5563")};
`;

const ProgressBarWrapper = styled.div`
  width: 140px;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{
  percent: number;
  isCurrentUser?: boolean;
  isOverBudget?: boolean;
}>`
  width: ${({ percent }) => `${percent}%`};
  height: 100%;
  background-color: ${({ isOverBudget, isCurrentUser }) =>
    isOverBudget ? "#ef4444" : isCurrentUser ? "#10b981" : "#3b82f6"};
  border-radius: 3px;
`;

const EmptyState = styled.div`
  padding: 60px 0;
  text-align: center;
  color: #9ca3af;
  font-size: 15px;
`;

const BudgetSettingButton = styled.button`
  margin-left: auto;
  flex-shrink: 0;
  padding: 8px 18px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
`;

export default RankingPage;

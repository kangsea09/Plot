import { useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import styled from "@emotion/styled";

// 카테고리 타입 정의
type CategoryType =
  | "전체"
  | "뷰티/미용"
  | "문화"
  | "쇼핑/여가"
  | "수입"
  | "교통/차량"
  | "식비"
  | "기타";

// 예산 소진율을 반영한 데이터 구조 인터페이스
interface RankingItem {
  rank: number;
  userName: string;
  amount: number; // 실제 지출 금액
  budget: number; // 해당 카테고리에 설정한 개인 예산
  usageRate: number; // 카테고리 예산 소진율 (%) -> (amount / budget) * 100
  isCurrentUser?: boolean;
}

const RankingPage = () => {
  const categories: CategoryType[] = [
    "전체",
    "식비",
    "쇼핑/여가",
    "교통/차량",
    "문화",
    "뷰티/미용",
    "수입",
    "기타",
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryType>("전체");

  // 예산 대비 소진율(usageRate) 기준 가상 데이터
  // 소진율이 낮을수록 선방하고 있으므로 랭킹이 높습니다.
  const dummyRankings: Record<CategoryType, RankingItem[]> = {
    전체: [
      {
        rank: 1,
        userName: "김절약",
        amount: 240000,
        budget: 600000,
        usageRate: 40,
      }, // 예산의 40%만 씀
      {
        rank: 2,
        userName: "이소비",
        amount: 450000,
        budget: 700000,
        usageRate: 64,
      },
      {
        rank: 3,
        userName: "강세아",
        amount: 420000,
        budget: 500000,
        usageRate: 84,
        isCurrentUser: true,
      },
      {
        rank: 4,
        userName: "박가성비",
        amount: 550000,
        budget: 500000,
        usageRate: 110,
      }, // 예산 초과!
    ],
    식비: [
      {
        rank: 1,
        userName: "밥도둑",
        amount: 150000,
        budget: 450000,
        usageRate: 33,
      }, // 33% 소진
      {
        rank: 2,
        userName: "강세아",
        amount: 180000,
        budget: 300000,
        usageRate: 60,
        isCurrentUser: true,
      }, // 60% 소진 (소득 낮아도 예산 내에서 선방하면 상위권 가능)
      {
        rank: 3,
        userName: "요리왕",
        amount: 350000,
        budget: 400000,
        usageRate: 87.5,
      },
      {
        rank: 4,
        userName: "프로외식러",
        amount: 1200000,
        budget: 800000,
        usageRate: 150,
      }, // 예산 대폭 초과
    ],
    "뷰티/미용": [],
    문화: [],
    "쇼핑/여가": [],
    수입: [],
    "교통/차량": [],
    기타: [],
  };

  const currentRankings = dummyRankings[activeCategory] || [];

  return (
    <Layout>
      <Container>
        <PageHeader
          label="MONTHLY RANKING"
          title="당월 카테고리별 사용자 랭킹"
          desc="자신이 설정한 카테고리별 예산 한도 내에서 누가 더 소비를 잘 참아냈는지 겨뤄보세요"
        />

        {/* 카테고리 네비게이션 탭 */}
        <TabContainer>
          {categories.map((category) => (
            <TabButton
              key={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </TabButton>
          ))}
        </TabContainer>

        {/* 랭킹 리스트 섹션 */}
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
                const isOverBudget = item.usageRate > 100; // 예산 초과 여부

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

                    {/* 예산 소진율 게이지 영역 */}
                    <RatioCell width="35%">
                      <RatioText isOverBudget={isOverBudget}>
                        {item.usageRate}% {isOverBudget && "⚠️"}
                      </RatioText>
                      <ProgressBarWrapper>
                        <ProgressBar
                          percent={Math.min(item.usageRate, 100)} // 100% 넘어가도 바 그래프는 100%로 고정
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
    </Layout>
  );
};

// --- Styled Components ---

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

export default RankingPage;

import type { Transaction, Category } from "../types/transaction";

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    title: "월급",
    memo: "정기 급여",
    category: "수입",
    date: "2026-05-01",
    amount: 3000000,
    type: "수입",
  },
  {
    id: 2,
    title: "헬스장",
    memo: "월 이용권",
    category: "뷰티/미용",
    date: "2026-05-05",
    amount: -89000,
    type: "지출",
  },
  {
    id: 3,
    title: "OTT 구독",
    memo: "자동결제",
    category: "문화",
    date: "2026-05-08",
    amount: -14500,
    type: "지출",
  },
  {
    id: 4,
    title: "주말 전시",
    memo: "문화생활",
    category: "쇼핑/여가",
    date: "2026-05-10",
    amount: -35000,
    type: "지출",
  },
  {
    id: 5,
    title: "장보기",
    memo: "주간 식재료",
    category: "식비",
    date: "2026-05-14",
    amount: -76000,
    type: "지출",
  },
];

export const CATEGORIES: Category[] = [
  "전체",
  "뷰티/미용",
  "문화",
  "쇼핑/여가",
  "수입",
  "교통/차량",
  "식비",
  "기타",
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  전체: { bg: "#F9E8E8", text: "#C44B4B" },
  "뷰티/미용": { bg: "#E8F0F9", text: "#3A6CA8" },
  문화: { bg: "#E8F9F2", text: "#2E8B5A" },
  "쇼핑/여가": { bg: "#FFF3E0", text: "#BF7A1A" },
  수입: { bg: "#E8F5E9", text: "#2E7D32" },
  "교통/차량": { bg: "#F3E5F5", text: "#7B1FA2" },
  식비: { bg: "#FBE9E7", text: "#BF360C" },
  기타: { bg: "#F5F5F5", text: "#616161" },
};

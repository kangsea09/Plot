export type TransactionType = "지출" | "수입";

export type Category =
  | "전체"
  | "수입"
  | "부수입"
  | "월급"
  | "용돈"
  | "뷰티/미용"
  | "문화"
  | "쇼핑/여가"
  | "교통/차량"
  | "식비"
  | "기타";

export interface Transaction {
  id: number;
  title: string;
  memo: string;
  category: Category;
  date: string;
  amount: number;
  type: TransactionType;
}

export const formatAmount = (amount: number): string => {
  const abs = Math.abs(amount).toLocaleString("ko-KR");
  return amount > 0 ? `+${abs}원` : `-${abs}원`;
};

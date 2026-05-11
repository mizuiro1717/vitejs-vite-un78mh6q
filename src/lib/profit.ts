export function calculateProfit(card: {
  raw_price: number;
  psa10_price: number;
}) {
  const profit = card.psa10_price - card.raw_price;
  const roi = card.raw_price > 0 ? (profit / card.raw_price) * 100 : 0;

  // スコア計算（ROIと利益額のバランス）
  const score = (profit / 1000) * (roi / 100);

  return {
    profit,
    roi,
    score,
    isProfit: profit > 0,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(value);
}

// ★ ここがエラーの原因でした。この関数を確実に入れます。
export function formatScore(score: number) {
  return score.toFixed(1);
}

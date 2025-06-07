const currencyFormatter = (
  amount: number,
  locale: string = "en-GB",
  currency: string = "GBP"
): string => {
  const isWhole = amount % 1 === 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default currencyFormatter;

export const percentageFormat = (number) => {
  return Number(number).toFixed(2)
}

export const abbreviateDollar = (number, decimalPlaces) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: 0,
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const longDollarFormat = (number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

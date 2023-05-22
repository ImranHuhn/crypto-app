export const abbreviateNumber = (number) => {
  return Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
};

export const threeDecimalAbbreviate = (number) => {
  return Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
  }).format(number);
};

export const dollarFormat = (number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

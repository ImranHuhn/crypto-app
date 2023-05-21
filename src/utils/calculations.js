export const abbreviateNumber  = (number) => {
    return Intl.NumberFormat("en-GB", {
        notation: "compact",
        compactDisplay: "short",
      }).format(number);
}

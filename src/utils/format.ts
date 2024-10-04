import numeral from "numeral";

const NUMBER_FOMRATTER = "0,0.00";

export const formatNumber = (arg?: string | number) =>
  numeral(arg ?? 0)
    .format(NUMBER_FOMRATTER)
    .replace(",", " ");

import { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction | undefined;

export const setNavigate = (arg?: NavigateFunction) => {
  navigate = arg;
};

export const getNavigate = () => navigate;

export const objectToQueryParams = (arg: Record<string, any>) => {
  const filteredArg = Object.fromEntries(
    Object.entries(arg).filter(([_, value]) => value != null)
  );
  return new URLSearchParams(filteredArg).toString();
};

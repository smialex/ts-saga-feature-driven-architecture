import { useSelector } from "react-redux";
import { TRootState } from "../../../types";

const selectIsLoading = (state: TRootState) => state.common.loader;

export const useIsLoading = () => {
  const isLoading = useSelector(selectIsLoading);
  return isLoading;
};

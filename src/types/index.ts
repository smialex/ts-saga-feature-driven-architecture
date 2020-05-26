import { TRootState as TState } from "../store";

export type TRootState = TState;

type TInferActionValues<T> = T extends { [key: string]: infer U } ? U : never;
export type TInferActionTypes<TAtions extends { [key: string]: (...args: any) => any }> = ReturnType<
  TInferActionValues<TAtions>
>;

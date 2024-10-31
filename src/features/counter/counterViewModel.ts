import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";
import { RootState } from "@/store";

export const useCounterViewModel = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  return {
    count,
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  };
};

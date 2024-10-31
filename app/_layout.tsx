import { Stack } from "expo-router/stack";
import { store } from "../src/store";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}

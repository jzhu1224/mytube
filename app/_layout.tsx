import { Stack } from "expo-router/stack";
import { store } from "../src/store/store";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="watch/[id]" options={{ title: "" }} />
      </Stack>
    </Provider>
  );
}

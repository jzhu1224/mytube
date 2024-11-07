import { render } from "@testing-library/react-native";

import HomeScreen, { CustomText } from "../test";

describe("<HomeScreen />", () => {
  test("Text renders correctly on HomeScreen", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Welcome!")).toBeDefined();
  });
});

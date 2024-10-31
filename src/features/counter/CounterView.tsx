import React from "react";
import { Button, View, Text } from "react-native";
import { useCounterViewModel } from "./counterViewModel";

export default function CounterView() {
  const { count, increment, decrement } = useCounterViewModel();

  return (
    <View>
      <View>
        <Button
          title="Increment"
          aria-label="Increment value"
          onPress={increment}
        />
        <Text>{count}</Text>
        <Button
          title="Decrement"
          aria-label="Decrement value"
          onPress={decrement}
        />
      </View>
    </View>
  );
}

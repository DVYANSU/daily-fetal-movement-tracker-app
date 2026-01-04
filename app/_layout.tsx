// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
      <Stack.Screen
        name="counter"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack>
  );
}
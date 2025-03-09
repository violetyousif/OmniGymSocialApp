import { Tabs, Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="RegisterGym" options={{ title: "Register Gym" }} />
      <Tabs.Screen name="RegisterAccount" options={{ title: "Register Account" }} />
    </Tabs>
  );
}

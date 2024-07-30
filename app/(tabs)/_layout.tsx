import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: "#1d1e24",
                    borderTopColor: "#5F2B92",
                    borderTopWidth: 1.5,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: "Home",
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="home"
                            size={32}
                            color={focused ? "#5F2B92" : "white"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

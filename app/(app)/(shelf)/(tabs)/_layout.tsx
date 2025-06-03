import { Redirect, Tabs, useSegments } from "expo-router";
import "@/app/global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { searchPlusIcon } from "@/assets/icons/search-plus-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { cn } from "@/lib/utils/cn";
import { useSession } from "@/store/AuthSessionProvider";
import useActiveTabStore from "@/store/useActiveTabStore";
import type { FC } from "react";
import React, { useState } from "react";
import { Text } from "react-native";
import { SvgXml } from "react-native-svg";

const AppLayout: FC = () => {
	const { activeTab, setActiveTab } = useActiveTabStore();
	const { session, isLoading } = useSession();
	const segment = useSegments();
	// const page = segment[segment.length - 1];
	// const pagesToHideTabBar = [
	// 	"sign-in",
	// 	"sign-up",
	// 	"forgot-password",
	// 	"[id]",
	// 	"details",
	// 	"notes",
	// ];

	if (isLoading) console.log("loading");
	if (!session) return <Redirect href="/sign-in" />;

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				animation: "fade",
				tabBarStyle: {
					height: 60,
				},
			}}
		>
			<Tabs.Screen
				name="library"
				options={{
					tabBarIcon: ({ focused }) => (
						<Box
							className={cn(
								" px-3 py-1 rounded-full",
								activeTab === "library" ? "bg-black/10" : "bg-white",
							)}
						>
							<SvgXml xml={shelfIcon} width={24} height={24} />
						</Box>
					),
					tabBarLabel: ({ focused }) => (
						<Text
							className={`text-sm font-semibold ${
								focused ? "text-black" : "text-black/50"
							}`}
						>
							library
						</Text>
					),
					tabBarButton: ({ children, onPress }) => (
						<Pressable
							onPress={() => {
								setActiveTab("library");
								onPress();
							}}
							className={cn("flex-1 justify-center items-center")}
							opacity={activeTab === "library" ? 1 : 0.5}
						>
							{children}
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					tabBarIcon: ({ focused }) => (
						<Box
							className={cn(
								" px-3 py-1 rounded-full",
								activeTab === "search" ? "bg-black/10" : "bg-white",
							)}
						>
							<SvgXml xml={searchPlusIcon} width={24} height={24} />
						</Box>
					),
					tabBarLabel: ({ focused }) => (
						<Text
							className={`text-sm font-semibold ${
								focused ? "text-black" : "text-black/50"
							}`}
						>
							search
						</Text>
					),
					tabBarButton: ({ children, onPress }) => (
						<Pressable
							onPress={() => {
								setActiveTab("search");
								onPress();
							}}
							className={cn("flex-1 justify-center items-center")}
							opacity={activeTab === "search" ? 1 : 0.5}
						>
							{children}
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="progress"
				options={{
					tabBarIcon: ({ focused }) => (
						<Box
							className={cn(
								" px-3 py-1 rounded-full",
								activeTab === "progress" ? "bg-black/10" : "bg-white",
							)}
						>
							<SvgXml xml={chartsIcon} width={24} height={24} />
						</Box>
					),
					tabBarLabel: ({ focused }) => (
						<Text
							className={`text-sm font-semibold ${
								focused ? "text-black" : "text-black/50"
							}`}
						>
							progress
						</Text>
					),
					tabBarButton: ({ children, onPress }) => (
						<Pressable
							onPress={() => {
								setActiveTab("progress");
								onPress();
							}}
							className="flex-1 justify-center items-center"
							opacity={activeTab === "progress" ? 1 : 0.5}
						>
							{children}
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
};

export default AppLayout;

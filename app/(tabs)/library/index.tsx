import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

type FilterType = "title" | "author" | "year" | "category";

const LibraryIndex = () => {
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState<FilterType>("title");
	const [viewMode, setViewMode] = useState<"owned" | "wishlist">("owned");

	const filterOptions: FilterType[] = ["title", "author", "year", "category"];

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Box>
				<Text>/library</Text>
			</Box>
		</SafeAreaView>
	);
};

export default LibraryIndex;

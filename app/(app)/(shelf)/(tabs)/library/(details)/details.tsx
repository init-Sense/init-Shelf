import { useBook } from "@/hooks/useBook";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Dimensions,
	Image,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function BookDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const { data: book, isLoading, error } = useBook(id);
	const windowHeight = Dimensions.get("window").height;

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 items-center justify-center p-4">
				<Text className="text-red-500 mb-4">Error: {error.message}</Text>
				<TouchableOpacity
					className="bg-black px-4 py-2 rounded"
					onPress={() => router.back()}
				>
					<Text className="text-white">Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	if (!book) {
		return (
			<View className="flex-1 items-center justify-center p-4">
				<Text className="mb-4">Book not found</Text>
				<TouchableOpacity
					className="bg-black px-4 py-2 rounded"
					onPress={() => router.back()}
				>
					<Text className="text-white">Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const { volumeInfo } = book;

	const getIsbn10 = () => {
		if (!volumeInfo.industryIdentifiers) return null;
		const isbn10 = volumeInfo.industryIdentifiers.find(
			(id) => id.type === "ISBN_10",
		);
		return isbn10 ? isbn10.identifier : null;
	};

	const getIsbn13 = () => {
		if (!volumeInfo.industryIdentifiers) return null;
		const isbn13 = volumeInfo.industryIdentifiers.find(
			(id) => id.type === "ISBN_13",
		);
		return isbn13 ? isbn13.identifier : null;
	};

	return (
		<SafeAreaView className="flex-1 relative">
			<View
				className={
					"absolute top-0 left-0 right-0 z-10 bg-white flex flex-row justify-between p-4 border-b"
				}
				style={{ elevation: 4, shadowOpacity: 0.1, shadowRadius: 3 }}
			>
				<View className={"flex flex-col"}>
					{volumeInfo.authors && (
						<Text className={"text-[20px] text-gray-500"}>
							{volumeInfo.authors.join(", ")}
						</Text>
					)}
					<Text className={"text-[24px] font-semibold"}>
						{volumeInfo.title}
					</Text>
				</View>

				<Image
					className={"w-[93px] h-[147px]"}
					source={{
						uri:
							volumeInfo.imageLinks?.smallThumbnail ||
							"https://via.placeholder.com/128x192?text=No+Cover",
					}}
					resizeMode="contain"
				/>
			</View>

			<ScrollView className="flex-1 pt-[180px] pb-[80px]">
				<View className={"p-4"}>
					<View className={"flex flex-col gap-2 mb-6"}>
						<Text className={"font-semibold text-[14px]"}>edition info</Text>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-row justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>title</Text>
							<Text className={"text-[16px]"}>{volumeInfo?.title}</Text>
						</View>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-row justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>author/s</Text>
							<Text className={"text-[16px]"}>
								{volumeInfo.authors && (
									<Text className={"text-[16px]"}>
										{volumeInfo.authors.join(", ")}
									</Text>
								)}
							</Text>
						</View>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-row justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>published in</Text>
							<Text className={"text-[16px]"}>{volumeInfo?.publishedDate}</Text>
						</View>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-row justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>language</Text>
							<Text className={"text-[16px]"}>
								{volumeInfo?.language || "Unknown"}
							</Text>
						</View>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-row justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>publisher</Text>
							{volumeInfo.publisher && (
								<Text className={"text-[16px]"}>
									{volumeInfo.publisher}
									{volumeInfo.publishedDate
										? `, ${volumeInfo.publishedDate.substring(0, 4)}`
										: ""}
								</Text>
							)}
						</View>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-col justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>description</Text>
							{volumeInfo.description && (
								<Text className={"text-[16px] mt-2"}>
									{volumeInfo.description}
								</Text>
							)}
						</View>
					</View>
					<View className={"flex flex-col gap-2 mb-6"}>
						<Text className={"font-semibold text-[14px]"}>catalogation</Text>
						{volumeInfo.categories && volumeInfo.categories.length > 0 && (
							<View
								className={
									"border border-gray-300 px-3 py-4 flex flex-row justify-between"
								}
							>
								<Text className={"text-[16px] text-[#5D5D5D]"}>categories</Text>
								<Text className={"text-[16px] flex-1 text-right"}>
									{volumeInfo.categories.join(", ")}
								</Text>
							</View>
						)}
					</View>
					<View className={"flex flex-col gap-2 mb-6"}>
						<Text className={"font-semibold text-[14px]"}>id</Text>
						{getIsbn13() && (
							<View
								className={
									"border border-gray-300 px-3 py-4 flex flex-row justify-between"
								}
							>
								<Text className={"text-[16px] text-[#5D5D5D]"}>isbn 13</Text>
								<Text className={"text-[16px]"}>{getIsbn13()}</Text>
							</View>
						)}
						{getIsbn10() && (
							<View
								className={
									"border border-gray-300 px-3 py-4 flex flex-row justify-between"
								}
							>
								<Text className={"text-[16px] text-[#5D5D5D]"}>isbn 10</Text>
								<Text className={"text-[16px]"}>{getIsbn10()}</Text>
							</View>
						)}
					</View>
					<View className={"flex flex-col gap-2 mb-6"}>
						<Text className={"font-semibold text-[14px]"}>object</Text>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-row justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>pages</Text>
							<Text className={"text-[16px]"}>
								{volumeInfo.pageCount || "Unknown"}
							</Text>
						</View>
						<View
							className={
								"border border-gray-300 px-3 py-4 flex flex-row justify-between"
							}
						>
							<Text className={"text-[16px] text-[#5D5D5D]"}>size</Text>
							<Text className={"text-[16px]"}>
								{volumeInfo?.dimensions?.height || "?"} x
								{volumeInfo?.dimensions?.width || "?"} x
								{volumeInfo?.dimensions?.thickness || "?"} cm
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			<View className="absolute bottom-0 left-0 right-0">
				<TouchableOpacity
					className={"flex flex-col items-center bg-black p-4"}
					onPress={() => alert("Add to library functionality coming soon!")}
				>
					<Text className={"text-white text-[20px] font-semibold"}>save</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

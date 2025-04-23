import { useAuthor } from "@/hooks/author/useAuthor";
import { useWork } from "@/hooks/work/useWork";
import { getBookCoverUrl } from "@/utils/works";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function BookDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();

	if (!id) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500">Book ID is missing</Text>
				<TouchableOpacity
					className="mt-4 px-4 py-2 bg-black rounded"
					onPress={() => router.back()}
				>
					<Text className="text-white">Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const work = useWork(id);
	const author = useAuthor(work.data?.authors?.[0]?.author?.key);

	const getDescription = (desc: any): string => {
		if (!desc) return "No description available";
		if (typeof desc === "string") return desc;
		if (desc.value) return desc.value;
		return "No description available";
	};

	return (
		<View className="flex-1 bg-white">
			<View className="flex-row justify-between items-center p-4 border-b border-gray-200">
				<TouchableOpacity onPress={() => router.back()}>
					<Text className="text-black">Back</Text>
				</TouchableOpacity>
				<Text className="text-xl font-semibold" numberOfLines={1}>
					Book Details
				</Text>
				<View style={{ width: 40 }} />
			</View>

			{work.isLoading && (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#000" />
				</View>
			)}

			{work.isError && (
				<View className="flex-1 justify-center items-center p-4">
					<Text className="text-red-500 text-center mb-2">
						Failed to load book details
					</Text>
					<TouchableOpacity
						className="mt-4 px-4 py-2 bg-black rounded"
						onPress={() => router.back()}
					>
						<Text className="text-white">Go Back</Text>
					</TouchableOpacity>
				</View>
			)}

			{work.data && !work.isLoading && (
				<ScrollView className="flex-1 p-4">
					{author.isLoading && (
						<View className="absolute top-2 right-2 z-10">
							<ActivityIndicator size="small" color="#000" />
						</View>
					)}

					<View className="flex-row mb-6">
						<Image
							source={{ uri: getBookCoverUrl(work.data.covers?.[0], "M") }}
							className="w-32 h-48 rounded"
							resizeMode="cover"
						/>
						<View className="flex-1 ml-4 justify-center">
							<Text className="text-2xl font-bold text-black mb-1">
								{work.data.title}
							</Text>

							{author.data && !author.isError ? (
								<Text className="text-gray-600 mb-2">
									{author.data?.personal_name
										? author?.data?.personal_name
										: author?.data?.name}{" "}
								</Text>
							) : (
								<Text className="text-gray-600 mb-2">
									{work.data.authors && work.data.authors.length > 0
										? "By Author"
										: ""}
								</Text>
							)}

							{work.data.first_publish_date && (
								<Text className="text-gray-500">
									First published: {work.data.first_publish_date}
								</Text>
							)}

							<View className="flex-row mt-4">
								<TouchableOpacity
									className="bg-black px-4 py-2 mr-2"
									onPress={() => {
										console.log("Add to owned");
									}}
								>
									<Text className="text-white">Add to Own'd</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className="bg-white px-4 py-2 border border-black"
									onPress={() => {
										console.log("Add to wishlist");
									}}
								>
									<Text className="text-black">Add to Wishlist</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-semibold mb-2">Description</Text>
						<Text className="text-gray-700">
							{getDescription(work.data.description)}
						</Text>
					</View>

					{work.data.subjects && work.data.subjects.length > 0 && (
						<View className="mb-6">
							<Text className="text-lg font-semibold mb-2">Subjects</Text>
							<View className="flex-row flex-wrap">
								{work.data.subjects.slice(0, 10).map((subject, index) => (
									<View
										key={index}
										className="bg-gray-100 px-3 py-1 mr-2 mb-2 rounded"
									>
										<Text className="text-sm text-gray-700">{subject}</Text>
									</View>
								))}
							</View>
						</View>
					)}

					{author.data?.bio && !author.isError && (
						<View className="mb-6">
							<Text className="text-lg font-semibold mb-2">
								About the Author
							</Text>
							<Text className="text-gray-700">{author.data.bio}</Text>
						</View>
					)}
				</ScrollView>
			)}
		</View>
	);
}

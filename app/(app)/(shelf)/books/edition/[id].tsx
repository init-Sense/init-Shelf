import { useAuthor } from "@/hooks/author/useAuthor";
import { useEdition } from "@/hooks/edition/useEdition";
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

export default function EditionDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();

	if (!id) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500">Edition ID is missing</Text>
				<TouchableOpacity
					className="mt-4 px-4 py-2 bg-black rounded"
					onPress={() => router.back()}
				>
					<Text className="text-white">Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const edition = useEdition(id);
	const author = useAuthor(edition.data?.authors?.[0]?.key);
	const work = useWork(edition.data?.works?.[0]?.key);

	const isMainDataLoading = edition.isLoading;
	const isSecondaryDataLoading =
		(!!edition.data?.authors?.[0]?.key && author.isLoading) ||
		(!!edition.data?.works?.[0]?.key && work.isLoading);

	const hasEditionError = edition.isError;

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
					Edition Details
				</Text>
				<View style={{ width: 40 }} />
			</View>

			{isMainDataLoading && (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#000" />
				</View>
			)}

			{hasEditionError && (
				<View className="flex-1 justify-center items-center p-4">
					<Text className="text-red-500 text-center mb-2">
						Failed to load edition details
					</Text>
					<TouchableOpacity
						className="mt-4 px-4 py-2 bg-black rounded"
						onPress={() => router.back()}
					>
						<Text className="text-white">Go Back</Text>
					</TouchableOpacity>
				</View>
			)}

			{edition.data && !isMainDataLoading && !hasEditionError && (
				<ScrollView className="flex-1 p-4">
					{isSecondaryDataLoading && (
						<View className="absolute top-2 right-2 z-10">
							<ActivityIndicator size="small" color="#000" />
						</View>
					)}
					<View className="flex-row mb-6">
						<Image
							source={{
								uri: getBookCoverUrl(edition.data.covers?.[0], "M"),
							}}
							className="w-32 h-48 rounded"
							resizeMode="cover"
						/>
						<View className="flex-1 ml-4 justify-center">
							<Text className="text-2xl font-bold text-black mb-1">
								{edition.data.title}
							</Text>
							{author.data && !author.isError && (
								<Text className="text-gray-600 mb-2">
									{author.data?.personal_name
										? author?.data?.personal_name
										: author?.data?.name}
								</Text>
							)}
							{author.isError && (
								<Text className="text-gray-600 mb-2">
									Author information unavailable
								</Text>
							)}

							{edition.data.publish_date && (
								<Text className="text-gray-500 mb-1">
									Published: {edition.data.publish_date}
								</Text>
							)}

							{edition.data.publishers &&
								edition.data.publishers.length > 0 && (
									<Text className="text-gray-500 mb-1">
										Publisher: {edition.data.publishers.join(", ")}
									</Text>
								)}

							{edition.data.languages && (
								<Text className="text-gray-500 mb-1">
									Languages: {edition.data.languages.join(", ")}
								</Text>
							)}

							<View className="flex-row mt-4">
								<TouchableOpacity
									className="bg-black px-4 py-2 mr-2 rounded"
									onPress={() => {
										console.log("Add to owned");
									}}
								>
									<Text className="text-white">Add to Own'd</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className="bg-white px-4 py-2 border border-black rounded"
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
						<Text className="text-lg font-semibold mb-2">Details</Text>
						<View className="border-t border-gray-200">
							{edition.data.number_of_pages && (
								<View className="flex-row py-2 border-b border-gray-200">
									<Text className="text-gray-600 w-1/3">Pages</Text>
									<Text className="text-gray-900 flex-1">
										{edition.data.number_of_pages}
									</Text>
								</View>
							)}

							{edition.data.physical_format && (
								<View className="flex-row py-2 border-b border-gray-200">
									<Text className="text-gray-600 w-1/3">Format</Text>
									<Text className="text-gray-900 flex-1">
										{edition.data.physical_format}
									</Text>
								</View>
							)}

							{edition.data.isbn_13 && edition.data.isbn_13.length > 0 && (
								<View className="flex-row py-2 border-b border-gray-200">
									<Text className="text-gray-600 w-1/3">ISBN-13</Text>
									<Text className="text-gray-900 flex-1">
										{edition.data.isbn_13[0]}
									</Text>
								</View>
							)}

							{edition.data.isbn_10 && edition.data.isbn_10.length > 0 && (
								<View className="flex-row py-2 border-b border-gray-200">
									<Text className="text-gray-600 w-1/3">ISBN-10</Text>
									<Text className="text-gray-900 flex-1">
										{edition.data.isbn_10[0]}
									</Text>
								</View>
							)}

							{work.data && !work.isError && (
								<View className="flex-row py-2 border-b border-gray-200">
									<Text className="text-gray-600 w-1/3">Original Work</Text>
									<TouchableOpacity
										onPress={() => {
											if (edition.data?.works?.[0]?.key) {
												const workId = edition.data?.works?.[0]?.key.replace(
													"/works/",
													"",
												);
												router.push(`/books/work/${workId}`);
											}
										}}
									>
										<Text className="text-blue-600 flex-1">
											{work.data.title}
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					</View>
					<View className="mb-6">
						<Text className="text-lg font-semibold mb-2">Description</Text>
						<Text className="text-gray-700">
							{work.data && !work.isError
								? getDescription(work.data.description)
								: "No description available"}
							{work.isError && "(Failed to load work details)"}
						</Text>
					</View>
					{work.data?.subjects &&
						work.data.subjects.length > 0 &&
						!work.isError && (
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
							<Text className="text-gray-700">{author?.data?.bio}</Text>
						</View>
					)}
				</ScrollView>
			)}
		</View>
	);
}

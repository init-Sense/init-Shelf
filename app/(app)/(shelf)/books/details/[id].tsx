import { getBookCoverUrl } from "@/utils/bookUtils";
import { useQuery } from "@tanstack/react-query";
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
import { z } from "zod";

const BookDetailSchema = z.object({
	key: z.string(),
	title: z.string(),
	description: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
	covers: z.array(z.number()).optional(),
	authors: z
		.array(
			z.object({
				author: z.object({
					key: z.string(),
				}),
			}),
		)
		.optional(),
	first_publish_date: z.string().optional(),
	subjects: z.array(z.string()).optional(),
	subject_places: z.array(z.string()).optional(),
	subject_times: z.array(z.string()).optional(),
});

type BookDetail = z.infer<typeof BookDetailSchema>;

const fetchBookDetails = async (id: string): Promise<BookDetail> => {
	const cleanId = id.startsWith("/works/") ? id : `/works/${id}`;
	const response = await fetch(`https://openlibrary.org${cleanId}.json`);

	if (!response.ok) {
		throw new Error("Failed to fetch book details");
	}

	const data = await response.json();
	return BookDetailSchema.parse(data);
};

export default function BookDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();

	if (!id) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500">Book ID is missing</Text>
				<TouchableOpacity
					className="mt-4 px-4 py-2 bg-black"
					onPress={() => router.back()}
				>
					<Text className="text-white">Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const bookId = id.startsWith("/works/") ? id.replace("/works/", "") : id;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["bookDetail", bookId],
		queryFn: () => fetchBookDetails(bookId),
	});

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

			{isLoading && (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#000" />
				</View>
			)}

			{isError && (
				<View className="flex-1 justify-center items-center p-4">
					<Text className="text-red-500 text-center mb-2">
						Failed to load book details
					</Text>
					<TouchableOpacity
						className="mt-4 px-4 py-2 bg-black"
						onPress={() => router.back()}
					>
						<Text className="text-white">Go Back</Text>
					</TouchableOpacity>
				</View>
			)}

			{data && !isLoading && (
				<ScrollView className="flex-1 p-4">
					<View className="flex-row mb-6">
						<Image
							source={{ uri: getBookCoverUrl(data.covers?.[0], "M") }}
							className="w-32 h-48"
							resizeMode="cover"
						/>
						<View className="flex-1 ml-4 justify-center">
							<Text className="text-2xl font-bold text-black mb-1">
								{data.title}
							</Text>
							{data.authors && data.authors.length > 0 && (
								<Text className="text-gray-600 mb-2">
									{/* You would need to fetch author names separately */}
									By Author(s)
								</Text>
							)}
							{data.first_publish_date && (
								<Text className="text-gray-500">
									First published: {data.first_publish_date}
								</Text>
							)}

							{/* Add to collection buttons */}
							<View className="flex-row mt-4">
								<TouchableOpacity
									className="bg-black px-4 py-2 mr-2"
									onPress={() => {
										console.log("Add to owned");
										// Implementation for adding to owned collection
									}}
								>
									<Text className="text-white">Add to Own'd</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className="bg-white px-4 py-2 border border-black"
									onPress={() => {
										console.log("Add to wishlist");
										// Implementation for adding to wishlist
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
							{getDescription(data.description)}
						</Text>
					</View>

					{data.subjects && data.subjects.length > 0 && (
						<View className="mb-6">
							<Text className="text-lg font-semibold mb-2">Subjects</Text>
							<View className="flex-row flex-wrap">
								{data.subjects.slice(0, 10).map((subject, index) => (
									<View key={index} className="bg-gray-100 px-3 py-1 mr-2 mb-2">
										<Text className="text-sm text-gray-700">{subject}</Text>
									</View>
								))}
							</View>
						</View>
					)}
				</ScrollView>
			)}
		</View>
	);
}

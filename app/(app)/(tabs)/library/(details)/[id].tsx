import {caretRightIcon} from "@/assets/icons/caret-right-icon";
import {xIcon} from "@/assets/icons/x-icon";
import {useGetUserBookById} from "@/hooks/useGetUserBooks";
import {useDeleteUserBook, useUpdateUserBook,} from "@/hooks/useUserBookMutations";
import {useLocalSearchParams, useRouter} from "expo-router";
import React, {useState} from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import {SvgXml} from "react-native-svg";

export default function UserBookDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const { data: originalBook, isLoading, error } = useGetUserBookById(id);
	const { mutate: updateBook, isPending: isUpdating } = useUpdateUserBook();
	const { mutate: deleteBook, isPending: isDeleting } = useDeleteUserBook();

	const [editMode, setEditMode] = useState(false);
	const [bookData, setBookData] = useState<any>(null);

	React.useEffect(() => {
		if (originalBook) {
			setBookData({ ...originalBook });
		}
	}, [originalBook]);

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

	if (!originalBook || !bookData) {
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

	const handleInputChange = (field, value) => {
		setBookData({
			...bookData,
			[field]: value,
		});
	};

	const handleSaveChanges = () => {
		updateBook(
			{ id: originalBook.id, book: bookData },
			{
				onSuccess: () => {
					Alert.alert("Success", "Book updated successfully");
					setEditMode(false);
				},
				onError: (error) => {
					Alert.alert("Error", `Failed to update book: ${error.message}`);
				},
			},
		);
	};

	const handleDeleteBook = () => {
		Alert.alert(
			"Confirm Delete",
			"Are you sure you want to delete this book?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () => {
						deleteBook(originalBook.id, {
							onSuccess: () => {
								Alert.alert("Success", "Book deleted successfully");
								router.back();
							},
							onError: (error) => {
								Alert.alert("Error", `Failed to delete book: ${error.message}`);
							},
						});
					},
				},
			],
		);
	};

	const renderViewField = (label, value) => {
		return (
			<View className="flex flex-row justify-between">
				<Text className="text-[16px] text-[#5D5D5D]">{label}</Text>
				<Text className="text-[16px]">{value || "Not specified"}</Text>
			</View>
		);
	};

	const renderEditField = (label, field, placeholder, multiline = false) => {
		return (
			<View className="flex flex-row items-center justify-between border rounded-xl p-4">
				<Text className="text-[16px]">{label}</Text>
				<TextInput
					className="text-[16px]"
					value={String(bookData[field] || "")}
					onChangeText={(text) => handleInputChange(field, text)}
					placeholder={placeholder}
					placeholderTextColor="#00000080"
					selectionColor="#000000"
					underlineColorAndroid="transparent"
					autoCapitalize="none"
					autoCorrect={false}
					multiline={multiline}
					numberOfLines={multiline ? 4 : 1}
				/>
			</View>
		);
	};

	const renderEditMultilineField = (label, field, placeholder) => {
		return (
			<View className="border rounded-xl p-4">
				{label && <Text className="text-[16px] mb-2">{label}</Text>}
				<TextInput
					className="text-[16px] w-full"
					value={String(bookData[field] || "")}
					onChangeText={(text) => handleInputChange(field, text)}
					placeholder={placeholder}
					placeholderTextColor="#00000080"
					selectionColor="#000000"
					underlineColorAndroid="transparent"
					autoCapitalize="sentences"
					autoCorrect={true}
					multiline={true}
					numberOfLines={4}
					textAlignVertical="top"
				/>
			</View>
		);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View
				className={
					"absolute top-0 left-0 right-0 z-10 bg-white flex flex-row justify-between p-4 border-b"
				}
				style={{ elevation: 4, shadowOpacity: 0.1, shadowRadius: 3 }}
			>
				<View className={"flex flex-col flex-1 mr-3"}>
					{bookData.authors && (
						<Text className={"text-[20px] text-gray-500"}>
							{Array.isArray(bookData.authors)
								? bookData.authors.join(", ")
								: bookData.authors}
						</Text>
					)}
					<Text className={"text-[24px] font-semibold"}>{bookData.title}</Text>
				</View>

				<Image
					className={"w-[93px] h-[147px]"}
					source={{
						uri:
							bookData.cover ||
							"https://via.placeholder.com/128x192?text=No+Cover",
					}}
					resizeMode="contain"
				/>
			</View>

			{editMode ? (
				<ScrollView
					className="flex-1"
					contentContainerStyle={{ paddingTop: 180, paddingBottom: 120 }}
				>
					<View className="flex flex-col gap-2 px-4">
						<Text className="font-bold">edition info</Text>
						{renderEditField("title", "title", "title...")}
						{renderEditField("author/s", "authors", "authors...")}
						{renderEditField("publisher", "publisher", "publisher...")}
						{renderEditField("published in", "published_date", "YYYY-MM-DD...")}
						{renderEditField("language", "language", "language...")}
						{renderEditField("translator", "translator", "translator...")}
						{renderEditField("editor", "editor", "editor...")}

						<Text className="font-bold">work info</Text>
						{renderEditField(
							"original title",
							"original_title",
							"original title...",
						)}
						{renderEditField(
							"first published in",
							"first_published_date",
							"YYYY-MM-DD...",
						)}
						{renderEditField(
							"original language",
							"original_language",
							"original language...",
						)}

						<Text className="font-bold">catalogation</Text>
						{renderEditField("genres", "genres", "philosophy, literature...")}
						{renderEditField(
							"collections",
							"collections",
							"fiction, non-fiction...",
						)}

						<Text className="font-bold">description</Text>
						{renderEditMultilineField(
							null,
							"description",
							"Enter description...",
						)}

						<Text className="font-bold">ID</Text>
						{renderEditField("isbn 13", "isbn_13", "isbn 13...")}
						{renderEditField("isbn 10", "isbn_10", "isbn 10...")}

						<Text className="font-bold">object</Text>
						{renderEditField("format", "format", "paperback...")}
						{renderEditField("pages", "pages", "394...")}
						{renderEditField("size", "size", "15x4x3...")}

						<Text className="font-bold">acquisition</Text>
						{renderEditField("type", "acquisitionType", "purchase...")}
						{renderEditField("price", "price", "12,90€...")}
						{renderEditField("condition", "condition", "second hand...")}
						{renderEditField("when", "acquisition_date", "YYYY-MM-DD...")}
						{renderEditField("store", "store", "store name...")}
						{renderEditField("where", "location", "location...")}

						{/* Notes */}
						<Text className="font-bold">notes</Text>
						{renderEditMultilineField(null, "notes", "Add your notes here...")}

						{/* Delete Button */}
						<TouchableOpacity
							className="bg-red-500 p-4 rounded-xl mt-6 items-center"
							onPress={handleDeleteBook}
							disabled={isDeleting}
						>
							<Text className="text-white font-semibold">
								{isDeleting ? "Deleting..." : "Delete Book"}
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			) : (
				// View Mode - Style like search results [id].tsx
				<ScrollView
					className="flex-1"
					contentContainerStyle={{ paddingTop: 180, paddingBottom: 80 }}
				>
					<View className={"p-4"}>
						{/* Description */}
						<View className={"border-b border-slate-200 p-4"}>
							<Text className={"font-semibold text-[14px]"}>description</Text>
							<View className={"flex flex-col justify-between"}>
								<Text className={"text-[16px] mt-2"}>
									{bookData.description || "no description"}
								</Text>
							</View>
						</View>

						{/* Edition Info */}
						<View
							className={"flex flex-col gap-5 border-b border-slate-200 p-4"}
						>
							<Text className={"font-semibold text-[14px]"}>edition info</Text>

							{renderViewField("title", bookData.title)}
							{renderViewField(
								"author/s",
								Array.isArray(bookData.authors)
									? bookData.authors.join(", ")
									: bookData.authors,
							)}
							{renderViewField("published in", bookData.published_date)}
							{renderViewField("language", bookData.language)}
							{renderViewField("publisher", bookData.publisher)}
							{renderViewField("translator", bookData.translator)}
							{renderViewField("editor", bookData.editor)}
						</View>

						{/* Work Info */}
						<View
							className={"flex flex-col gap-5 border-b border-slate-200 p-4"}
						>
							<Text className={"font-semibold text-[14px]"}>work info</Text>

							{renderViewField("original title", bookData.original_title)}
							{renderViewField(
								"first published in",
								bookData.first_published_date,
							)}
							{renderViewField("original language", bookData.original_language)}
						</View>

						<View
							className={"flex flex-col gap-5 border-b border-slate-200 p-4"}
						>
							<Text className={"font-semibold text-[14px]"}>catalogation</Text>

							{renderViewField(
								"genres",
								Array.isArray(bookData.genres)
									? bookData.genres.join(", ")
									: bookData.genres,
							)}
							{renderViewField(
								"collections",
								Array.isArray(bookData.collections)
									? bookData.collections.join(", ")
									: bookData.collections,
							)}
						</View>

						<View
							className={"flex flex-col gap-5 border-b border-slate-200 p-4"}
						>
							<Text className={"font-semibold text-[14px]"}>id</Text>

							{renderViewField("isbn 13", bookData.isbn_13)}
							{renderViewField("isbn 10", bookData.isbn_10)}
						</View>

						{/* Object */}
						<View
							className={"flex flex-col gap-5 border-b border-slate-200 p-4"}
						>
							<Text className={"font-semibold text-[14px]"}>object</Text>

							{renderViewField("format", bookData.format)}
							{renderViewField("pages", bookData.pages)}
							{renderViewField("size", bookData.size)}
						</View>

						{/* Acquisition */}
						<View
							className={"flex flex-col gap-5 border-b border-slate-200 p-4"}
						>
							<Text className={"font-semibold text-[14px]"}>acquisition</Text>

							{renderViewField("type", bookData.acquisitionType)}
							{renderViewField("price", bookData.price)}
							{renderViewField("condition", bookData.condition)}
							{renderViewField("when", bookData.acquisition_date)}
							{renderViewField("store", bookData.store)}
							{renderViewField("where", bookData.location)}
						</View>

						<View className={"flex flex-col gap-5 p-4"}>
							<Text className={"font-semibold text-[14px]"}>notes</Text>

							<Text className={"text-[16px]"}>
								{bookData.notes || "No notes"}
							</Text>
						</View>
					</View>
				</ScrollView>
			)}

			<View className="absolute bottom-0 left-0 right-0">
				<View className="px-6 py-6 flex flex-row gap-4 bg-white border-t">
					<TouchableOpacity
						className="w-16 h-16 flex items-center justify-center bg-white border rounded-xl"
						onPress={() => {
							setBookData({ ...originalBook });
							setEditMode(false);
						}}
						disabled={isUpdating}
					>
						<SvgXml xml={xIcon} height={24} width={24} />
					</TouchableOpacity>

					{editMode ? (
						<TouchableOpacity
							className={`flex-1 h-16 flex flex-row items-center justify-between ${isUpdating ? "bg-gray-700" : "bg-black"} border px-6 rounded-xl`}
							onPress={handleSaveChanges}
							disabled={isUpdating}
						>
							<Text className="text-white text-[20px] font-semibold">
								{isUpdating ? "Saving..." : "save"}
							</Text>
							<SvgXml xml={caretRightIcon} height={24} width={24} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							className={`flex-1 h-16 flex flex-row items-center justify-between ${isUpdating ? "bg-gray-700" : "bg-black"} border px-6 rounded-xl`}
							onPress={() => setEditMode(true)}
						>
							<Text className="text-white text-[20px] font-semibold">edit</Text>
							<SvgXml xml={caretRightIcon} height={24} width={24} />
						</TouchableOpacity>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}

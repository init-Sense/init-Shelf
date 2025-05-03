import { useLibraryStore } from "@/store/useLibraryStore";
import { Link, usePathname } from "expo-router";
import { type FC, useEffect } from "react";
import { Pressable, Text, View } from "react-native";

const Index: FC = () => {
	const pathname = usePathname();
	const { currentLibrary, setCurrentLibrary, getCurrentLibraryCategories } =
		useLibraryStore();

	useEffect(() => {
		if (pathname.includes("/films")) {
			setCurrentLibrary("films");
		} else if (pathname.includes("/games")) {
			setCurrentLibrary("games");
		} else {
			setCurrentLibrary("books");
		}
	}, [pathname, setCurrentLibrary]);

	const categories = getCurrentLibraryCategories();

	return (
		<View className="flex flex-col gap-4 items-center py-4">
			{categories.map((category) => (
				<Link
					key={category.id}
					href={{
						pathname: `/${currentLibrary}/[category]`,
						params: { category: category.id },
					}}
				>
					<View
						className={
							category.id === "owned" || category.id === "watched"
								? "border w-[368px] h-[238px] flex flex-row justify-between px-3"
								: "border w-[368px] h-[44px] flex flex-row justify-between px-3"
						}
					>
						<Text className="my-auto text-xl text-black">{category.label}</Text>
						<Text className="my-auto text-xl text-black/50">
							{category.count}
						</Text>
					</View>
				</Link>
			))}

			<Pressable>
				<View className="border w-[368px] h-[44px] flex flex-row justify-between px-3">
					<Text className="m-auto text-xl text-black">+</Text>
				</View>
			</Pressable>
		</View>
	);
};

export default Index;

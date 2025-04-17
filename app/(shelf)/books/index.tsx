import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View className={"flex flex-col gap-4 items-center mt-auto py-4"}>
			<Link
				href={{
					pathname: "/books/[category]",
					params: { category: "owned" },
				}}
			>
				<View
					className={
						"border w-[368px] h-[238px] flex flex-row justify-between px-3"
					}
				>
					<Text className={"my-auto text-xl text-black"}>owned</Text>
					<Text className={"my-auto text-xl text-black/50"}>400</Text>
				</View>
			</Link>
			<Link
				href={{
					pathname: "/books/[category]",
					params: { category: "wishlist" },
				}}
			>
				<View
					className={
						"border w-[368px] h-[44px] flex flex-row justify-between px-3"
					}
				>
					<Text className={"my-auto text-xl text-black"}>wishlist</Text>
					<Text className={"my-auto text-xl text-black/50"}>32</Text>
				</View>
			</Link>
			<View
				className={
					"border w-[368px] h-[44px] flex flex-row justify-between px-3"
				}
			>
				<Text className={"m-auto text-xl text-black"}>+</Text>
			</View>
		</View>
	);
}

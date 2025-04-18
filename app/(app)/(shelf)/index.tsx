import { useSession } from "@/store/ctx";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	const { signOut } = useSession();

	return (
		<View className={"flex flex-col gap-4 items-center py-4"}>
			<View
				className={
					"flex flex-row justify-between items-center w-full px-6 pb-16"
				}
			>
				<Text className={"text-[32px] text-black"}>init.Shelf</Text>
				<Text
					onPress={() => {
						signOut();
					}}
				>
					Sign Out
				</Text>
				{/*<View className={"w-[48px] h-[48px] bg-gray-300 rounded-full"} />*/}
			</View>
			<Link href={"./books"}>
				<View
					className={
						"border w-[368px] h-[144px] flex flex-row justify-between px-3"
					}
				>
					<Text className={"my-auto text-xl text-black"}>books</Text>
					<Text className={"my-auto text-xl text-black/50"}>432</Text>
				</View>
			</Link>{" "}
			<Link href={"./films"}>
				<View
					className={
						"border w-[368px] h-[144px] flex flex-row justify-between px-3"
					}
				>
					<Text className={"my-auto text-xl text-black"}>filming soon</Text>
					<Text className={"my-auto text-xl text-black/50"}>???</Text>
				</View>
			</Link>{" "}
			<Link href={"./games"}>
				<View
					className={
						"border w-[368px] h-[144px] flex flex-row justify-between px-3"
					}
				>
					<Text className={"my-auto text-xl text-black"}>gaming soon</Text>
					<Text className={"my-auto text-xl text-black/50"}>???</Text>
				</View>
			</Link>
		</View>
	);
}

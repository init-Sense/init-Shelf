import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { usePathname, useRouter } from "expo-router";

export const Navbar = () => {
	const { navigate } = useRouter();
	const pathname = usePathname();

	return (
		<HStack
			space="md"
			className="pb-10 pt-2 items-center justify-center bg-neutral-200"
		>
			<Button
				className={cn(
					"flex flex-col items-center h-fit w-24 p-2",
					pathname.startsWith("/library") ? "bg-black" : "bg-neutral-200",
				)}
				onPress={() => navigate("/(tabs)/library")}
			>
				<Ionicons
					name="library-outline"
					size={20}
					color={pathname.startsWith("/library") ? "white" : "black"}
				/>
				<Text
					className={cn(pathname.startsWith("/library") ? " text-white" : "")}
				>
					library
				</Text>
			</Button>
			<Button
				className={cn(
					"flex flex-col items-center h-fit w-24 p-2",
					pathname.startsWith("/search") ? "bg-black" : "bg-neutral-200",
				)}
				onPress={() => navigate("/(tabs)/search")}
			>
				<Ionicons
					name="search"
					size={20}
					color={pathname.startsWith("/search") ? "white" : "black"}
				/>
				<Text
					className={cn(pathname.startsWith("/search") ? " text-white" : "")}
				>
					search
				</Text>
			</Button>
			<Button
				className={cn(
					"flex flex-col items-center h-fit w-24 p-2",
					pathname.startsWith("/queue") ? "bg-black" : "bg-neutral-200",
				)}
				onPress={() => navigate("/(tabs)/queue")}
			>
				<Ionicons
					name="bookmark-outline"
					size={20}
					color={pathname.startsWith("/queue") ? "white" : "black"}
				/>
				<Text
					className={cn(pathname.startsWith("/queue") ? " text-white" : "")}
				>
					queue
				</Text>
			</Button>
			<Button
				className={cn(
					"flex flex-col items-center h-fit w-24 p-2",
					pathname.startsWith("/dashboard") ? "bg-black" : "bg-neutral-200",
				)}
				onPress={() => navigate("/(tabs)/dashboard")}
			>
				<AntDesign
					name="user"
					size={20}
					color={pathname.startsWith("/dashboard") ? "white" : "black"}
				/>
				<Text
					className={cn(pathname.startsWith("/dashboard") ? " text-white" : "")}
				>
					dashboard
				</Text>
			</Button>
		</HStack>
	);
};

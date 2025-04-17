import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					color: "blue",
				}}
			>
				Categories go here.
			</Text>
			<Link href="./books/details">
				<Text>Go to Details</Text>
			</Link>
		</View>
	);
}

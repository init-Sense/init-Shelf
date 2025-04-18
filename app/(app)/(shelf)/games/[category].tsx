import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Category() {
	const { category } = useLocalSearchParams();

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
				Welcome to the {category.toString()} category!
			</Text>
		</View>
	);
}

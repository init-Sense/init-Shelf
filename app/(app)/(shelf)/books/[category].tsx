import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Category() {
	const { category } = useLocalSearchParams();

	return (
		<View>
			<Text>Welcome to the {category.toString()} category!</Text>
		</View>
	);
}

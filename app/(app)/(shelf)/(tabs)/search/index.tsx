import { Redirect } from "expo-router";

export default function Index() {
	return <Redirect href="/(app)/(shelf)/(tabs)/search/[media]" />;
}

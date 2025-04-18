import { useSession } from "@/store/AuthSessionProvider";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {
	const { signIn, isLoading } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Please enter both email and password");
			return;
		}

		const { error } = await signIn(email, password);

		if (error) {
			Alert.alert("Sign In Failed", error.message);
		} else {
			router.replace("/");
		}
	};

	return (
		<View className={"p-4 flex flex-col items-center justify-center h-full"}>
			<Text className={"font-bold mb-4 text-lg"}>Get Shelv'd</Text>

			<View>
				<View className={"flex flex-col gap-2 mb-4"}>
					<Text className={"font-bold"}>Email</Text>
					<TextInput
						className={"border p-4"}
						placeholder="Enter your email"
						value={email}
						onChangeText={setEmail}
						autoCapitalize="none"
						keyboardType="email-address"
					/>
				</View>

				<View className={"flex flex-col gap-2"}>
					<Text className={"font-bold"}>Password</Text>
					<TextInput
						className={"border p-4"}
						placeholder="Enter your password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity
					className={"border p-4 mt-12 bg-gray-100"}
					onPress={handleSignIn}
					disabled={isLoading}
				>
					<Text>{isLoading ? "Signing In..." : "Sign In"}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className={"p-2 mt-4 items-center"}
					onPress={() => router.replace("/sign-up")}
				>
					<Text className={"underline"}>Don't have an account? Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

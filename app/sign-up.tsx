// sign-up.tsx
import { useSession } from "@/store/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUp() {
	const { signUp, isLoading } = useSession();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSignUp = async () => {
		if (!username || !email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		if (!isValidEmail(email)) {
			Alert.alert("Error", "Please enter a valid email address");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Error", "Password should be at least 6 characters");
			return;
		}

		const { error } = await signUp(username, email, password);

		if (error) {
			Alert.alert("Registration Failed", error.message);
		} else {
			Alert.alert(
				"Registration Successful",
				"Please check your email for confirmation instructions.",
				[{ text: "OK", onPress: () => router.replace("/sign-in") }],
			);
		}
	};

	return (
		<View className={"flex flex-col items-center justify-center h-full"}>
			<Text className={"font-bold mb-4 text-lg"}>Why are you doing this?</Text>

			<View>
				<View className={"flex flex-col gap-2 mb-4"}>
					<Text className={"font-bold"}>Username</Text>
					<TextInput
						className={"border p-4"}
						placeholder="Choose a username"
						value={username}
						onChangeText={setUsername}
						autoCapitalize="none"
					/>
				</View>

				<View className={"flex flex-col gap-2 mb-4"}>
					<Text className={"font-bold"}>Email</Text>
					<TextInput
						className={"border p-4"}
						placeholder="Enter your email address"
						value={email}
						onChangeText={setEmail}
						autoCapitalize="none"
						keyboardType="email-address"
					/>
				</View>

				<View className={"flex flex-col gap-2 mb-4"}>
					<Text className={"font-bold"}>Password</Text>
					<TextInput
						className={"border p-4"}
						placeholder="Choose a password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<View className={"flex flex-col gap-2"}>
					<Text className={"font-bold"}>Confirm Password</Text>
					<TextInput
						className={"border p-4"}
						placeholder="Confirm your password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity
					className={"border p-4 mt-12 bg-gray-100"}
					onPress={handleSignUp}
					disabled={isLoading}
				>
					<Text>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className={"p-2 mt-4 items-center"}
					onPress={() => router.replace("/sign-in")}
				>
					<Text className={"underline"}>Already have an account? Sign In</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

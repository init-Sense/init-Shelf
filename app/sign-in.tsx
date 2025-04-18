// sign-in.tsx
import { useSession } from "@/store/ctx";
import { router } from "expo-router";
import { useState } from "react";
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

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
		<View style={styles.container}>
			<Text style={styles.title}>Sign In</Text>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter your email"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter your password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={handleSignIn}
				disabled={isLoading}
			>
				<Text style={styles.buttonText}>
					{isLoading ? "Signing In..." : "Sign In"}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.linkContainer}
				onPress={() => router.replace("/sign-up")}
			>
				<Text style={styles.link}>Don't have an account? Sign Up</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	inputContainer: {
		width: "100%",
		marginVertical: 10,
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		fontSize: 16,
		width: "100%",
	},
	button: {
		backgroundColor: "#2196F3",
		padding: 15,
		borderRadius: 5,
		width: "100%",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	linkContainer: {
		marginTop: 20,
	},
	link: {
		color: "#4CAF50",
		textDecorationLine: "underline",
	},
});

// sign-up.tsx
import { useSession } from "@/store/ctx";
import { router } from "expo-router";
import { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

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
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<Text style={styles.title}>Create Account</Text>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Username</Text>
					<TextInput
						style={styles.input}
						placeholder="Choose a username"
						value={username}
						onChangeText={setUsername}
						autoCapitalize="none"
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter your email address"
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
						placeholder="Choose a password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Confirm Password</Text>
					<TextInput
						style={styles.input}
						placeholder="Confirm your password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={handleSignUp}
					disabled={isLoading}
				>
					<Text style={styles.buttonText}>
						{isLoading ? "Creating Account..." : "Sign Up"}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.linkContainer}
					onPress={() => router.replace("/sign-in")}
				>
					<Text style={styles.link}>Already have an account? Sign In</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
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
		marginTop: 40,
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
		backgroundColor: "#4CAF50",
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
		marginBottom: 40,
	},
	link: {
		color: "#2196F3",
		textDecorationLine: "underline",
	},
});

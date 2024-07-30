import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    AuthError,
} from "@firebase/auth";

export default function Auth() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const auth = FIREBASE_AUTH;

    const handleAuthError = (error: AuthError) => {
        switch (error.code) {
            case "auth/invalid-email":
                setError("Invalid email address.");
                break;
            case "auth/user-disabled":
                setError("This user account has been disabled.");
                break;
            case "auth/user-not-found":
            case "auth/invalid-credential":
                setError("Invalid email or password.");
                break;
            case "auth/email-already-in-use":
                setError("This email is already in use.");
                break;

            default:
                setError("An error occurred. Please try again.");
        }
    };

    async function signInWithEmail() {
        setLoading(true);
        setError("");
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(response);
            router.replace("/home");
        } catch (error) {
            console.error(error);
            handleAuthError(error as AuthError);
        } finally {
            setLoading(false);
        }
    }

    async function createUser() {
        setLoading(true);
        setError("");
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(response);
            router.replace("/home");
        } catch (error) {
            console.log(error);
            handleAuthError(error as AuthError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="bg-[#1d1e24] flex-col h-full pt-32 px-1">
            <KeyboardAvoidingView behavior="padding">
                <View className="p-2">
                    <View className="p-1">
                        <TextInput
                            mode="outlined"
                            label="Email"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder="email@address.com"
                            autoCapitalize={"none"}
                        />
                    </View>
                    <View className="p-1">
                        <TextInput
                            label="Password"
                            mode={"outlined"}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                            placeholder="*******"
                            autoCapitalize={"none"}
                        />
                    </View>
                    <View className="pt-1 pb-1 ">
                        <Button
                            mode="contained-tonal"
                            disabled={loading}
                            onPress={() => signInWithEmail()}
                        >
                            Log In
                        </Button>
                    </View>
                    <View className="pt-1 pb-1 ">
                        <Button
                            mode="contained-tonal"
                            disabled={loading}
                            onPress={() => createUser()}
                        >
                            Sign Up
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <Snackbar
                visible={!!error}
                onDismiss={() => setError("")}
                action={{
                    label: "Close",
                    onPress: () => setError(""),
                }}
            >
                {error}
            </Snackbar>
        </SafeAreaView>
    );
}

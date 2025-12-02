import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import Icon from "../assets/icons";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Input from "../components/Input";
import ScreenWrapper from "../components/ScreenWrapper";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import { supabase } from "../lib/supabase";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const onsubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      alert("Please fill in all fields");
      return;
    }

    let email = emailRef.current.trim().toLowerCase();
    let password = passwordRef.current;

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      // Login successful
      alert("Login Successful");

      router.push("home"); // or home screen
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome Text */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ color: theme.colors.text, fontSize: hp(2.5) }}>
            Please login to continue
          </Text>
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={2.6} />}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => (emailRef.current = text)}
          />
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={2.6} />}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => (passwordRef.current = text)}
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          {/* Button */}
          <Button
            color={theme.colors.primary}
            title={"Login"}
            loading={loading}
            onPress={onsubmit}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Dont have an account?</Text>
            <Pressable onPress={() => router.push("signUp")}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap: 45,
    paddingHorizontal: wp(5),
  },

  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },

  form: {
    gap: 25,
  },

  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  footerText: {
    textAlign: "center",
    color: theme.colors.dark,
    fontSize: hp(1.6),
    fontWeight: theme.fonts.medium,
  },
});

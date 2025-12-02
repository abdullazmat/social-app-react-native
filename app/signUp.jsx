import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  AppState,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "../assets/icons";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Input from "../components/Input";
import ScreenWrapper from "../components/ScreenWrapper";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import { supabase } from "../lib/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [loading, setLoading] = useState(false);
  const onsubmit = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      alert("Sign Up, Please fill in all fields");
      return;
    }

    let email = emailRef.current.trim().toLowerCase();
    let password = passwordRef.current;
    let name = nameRef.current.trim();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.session) {
        alert("Please check your email for verification");
        return;
      }

      alert("Sign Up Successful");
      router.push("login");
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
          <Text style={styles.welcomeText}>Lets</Text>
          <Text style={styles.welcomeText}>Get Started!</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ color: theme.colors.text, fontSize: hp(2.5) }}>
            Please fill in the details to create an account
          </Text>
          <Input
            icon={<Icon name="user" size={26} strokeWidth={2.6} />}
            placeholder="Name"
            keyboardType="default"
            onChangeText={(text) => (nameRef.current = text)}
          />
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

          {/* Button */}
          <Button
            color={theme.colors.primary}
            title={"Sign Up"}
            loading={loading}
            onPress={onsubmit}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("login")}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

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

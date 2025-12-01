import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/*  Welcome Image */}
        <Image
          style={styles.welcomeImage}
          source={require("../assets/images/welcome.png")}
          resizeMode="contain"
        />

        {/* Title */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>
            Where every thought finds a home and evey image tells a story
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Get Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("signup")}
          ></Button>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account</Text>
            <Pressable onPress={() => router.push("login")}>
              <Text
                style={[
                  styles.loginText,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: wp(10),
  },
  welcomeImage: {
    width: wp(100),
    height: hp(30),
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.textLight,
  },
  footer: {
    gap: 30,
    width: "100%",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: hp(1.6),
  },
});

export default Welcome;

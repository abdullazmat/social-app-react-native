import { Alert, Button, StyleSheet, Text } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { supabase } from "../../lib/supabase";

const Home = () => {
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign out", "Error Signing out");
    }
  };

  return (
    <ScreenWrapper>
      <Text>home</Text>
      <Button title="logout" onPress={onLogout} />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});

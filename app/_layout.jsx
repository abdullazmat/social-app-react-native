import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

function MainLayout() {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("SESSION:", session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session.user);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);

  const updateUserData = async (user) => {
    let res = await getUserData(user.id);
    if (res.success) {
      setUserData(res.data);
    } else {
      console.log("Error fetching user data:", res.msg);
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default _layout;

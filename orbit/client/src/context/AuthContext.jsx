import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createClient } from "@supabase/supabase-js";
import { AuthAPI } from "../services/api";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth        = getAuth(firebaseApp);
const provider    = new GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  function buildSupabaseUser(session) {
    if (!session?.user) return null;
    const u = session.user;
    return {
      uid:      u.id,
      email:    u.email,
      name:     u.user_metadata?.full_name || u.email,
      photoURL: u.user_metadata?.avatar_url || null,
      provider: "supabase",
    };
  }

  useEffect(() => {
    let resolved = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const sbUser = buildSupabaseUser(session);
        setUser(sbUser);
        localStorage.setItem("orbit_token", session.access_token);
        resolved = true;
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          const sbUser = buildSupabaseUser(session);
          setUser(sbUser);
          localStorage.setItem("orbit_token", session.access_token);
        } else if (!auth.currentUser) {
          setUser(null);
          localStorage.removeItem("orbit_token");
        }
        if (!resolved) setLoading(false);
      }
    );

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          localStorage.setItem("orbit_token", token);
          setUser({
            uid:      firebaseUser.uid,
            email:    firebaseUser.email,
            name:     firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: "google",
          });

          AuthAPI.verify(token)
            .then((profile) => {
              setUser((prev) => ({
                ...prev,
                ...profile,
                photoURL: firebaseUser.photoURL,
                provider: "google",
              }));
            })
            .catch((e) => console.error("AuthAPI.verify failed:", e));
        } catch (e) {
          console.error("Firebase getIdToken failed:", e);
        }
      }
      if (!resolved) {
        resolved = true;
        setLoading(false);
      }
    });

    return () => {
      unsub();
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const signInWithEmail = async (email, password) => {
    setError(null);
    const { data, error: sbErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (sbErr) {
      setError(sbErr.message);
      throw sbErr;
    }
    return data;
  };

  const registerWithEmail = async (email, password, fullName) => {
    setError(null);
    const { data, error: sbErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth?confirmed=true`,
      },
    });
    if (sbErr) {
      setError(sbErr.message);
      throw sbErr;
    }
    return data;
  };

  const logout = async () => {
    const currentProvider = user?.provider;
    if (currentProvider === "google") {
      await signOut(auth);
    } else {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("orbit_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      setError,
      signInWithGoogle,
      signInWithEmail,
      registerWithEmail,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
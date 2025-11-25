import { ref } from 'vue'

interface User {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  street: string;
  house_number: string;
  zip_code: string;
  city: string;
  is_provider: boolean;
}

const currentUser = ref<User | null>(null);
const isAuthenticated = ref<boolean>(false)

export function useAuth() {
  // Login
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost/OttbergenLocations-Backend/api/auth/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Sendet Session-Cookie mit
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // Nach erfolgreichem Login Benutzer laden
    if (data.success) {
      await fetchUser();
      return {success: true};
    }

    return {success: false, message: data.message || "Unbekannter Fehler"};
  };

  const fetchUser = async () => {
    const storedUser = localStorage.getItem("currentUser");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      currentUser.value = JSON.parse(storedUser);
      isAuthenticated.value = true;
    }

    const res = await fetch("http://localhost/OttbergenLocations-Backend/api/user/me.php", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      // Backend gibt is_provider jetzt garantiert als Boolean zurück
      currentUser.value = data.user;
      isAuthenticated.value = true;

      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("isAuthenticated", "true");
    } else {
      currentUser.value = null;
      isAuthenticated.value = false;

      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
    }
  };

  const logout = async () => {
    await fetch("http://localhost/OttbergenLocations-Backend/api/auth/logout.php", {
      method: "POST",
      credentials: "include"
    });

    currentUser.value = null;
    isAuthenticated.value = false;

    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
  };

  const register = async (formData: any) => {
    try {
      const res = await fetch("http://localhost/OttbergenLocations-Backend/api/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Backend returned non-JSON response:", await res.text());
        return {
          success: false,
          message: "Server-Fehler: Die Registrierung konnte nicht verarbeitet werden. Bitte überprüfen Sie die Backend-Konfiguration."
        };
      }

      const data = await res.json();

      if (data.success) {
        return { success: true };
      }

      return { success: false, message: data.message || "Registrierung fehlgeschlagen" };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Netzwerkfehler: Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut."
      };
    }
  }

  const becomeProvider = async () => {
    const res = await fetch("http://localhost/OttbergenLocations-Backend/api/user/become-provider.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    const data = await res.json();
    console.log('becomeProvider Response:', data);

    if (data.success) {
      // Benutzer neu laden um aktuellen Provider-Status zu erhalten
      await fetchUser();
      console.log('After fetchUser - currentUser.is_provider:', currentUser.value?.is_provider);
      return { success: true, message: data.message };
    }

    return { success: false, message: data.error?.message || "Fehler beim Registrieren als Provider" };
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    register,
    fetchUser,
    logout,
    becomeProvider
  }
}

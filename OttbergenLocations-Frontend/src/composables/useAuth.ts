import { ref } from 'vue'

interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  houseNumber: string | number;
  zipCode: string | number;
  city: string;
  isProvider: boolean;
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

    const res = await fetch("http://localhost/OttbergenLocations-Backend/helpers/me.php", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
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
  };

  const register = async (formData: any) => {
    const res = await fetch("http://localhost/OttbergenLocations-Backend/api/auth/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    const data = await res.json();

    if (data.success) {
      return { success: true };
    }

    return { success: false, message: data.message };
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    register,
    fetchUser,
    logout
  }
}

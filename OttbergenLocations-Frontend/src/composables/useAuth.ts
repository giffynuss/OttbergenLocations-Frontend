import { ref } from 'vue'

const user = ref(null);
const isAuthenticated = ref<boolean>(false)

export function useAuth() {
  // Login
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost/OttbergenLocations-Backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Sendet Session-Cookie mit
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // Nach erfolgreichem Login Benutzer laden
    if (data.success) {
      await fetchUser();
      return true;
    }

    return false;
  };

  const fetchUser = async () => {
    const res = await fetch("http://localhost/OttbergenLocations-Backend/me.php", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      user.value = data.user;
      isAuthenticated.value = true;
    } else {
      user.value = null;
      isAuthenticated.value = false;
    }
  };

  const logout = async () => {
    await fetch("http://localhost/OttbergenLocations-Backend/logout.php", {
      method: "POST",
      credentials: "include"
    });

    user.value = null;
    isAuthenticated.value = false;
  };

  const register = (name: string, email: string, password: string) => {
    
  }

  const checkAuth = () => {

  }

  return {
    user,
    isAuthenticated,
    login,
    fetchUser,
    logout
  }
}

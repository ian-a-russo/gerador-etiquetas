import { defineStore } from "pinia";

const ACCESS_KEY = "05004009ce0df58f47eb32a7ff5c4c73b3dbc865";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  }),

  actions: {
    login(accessKey: string) {
      const isValid = accessKey === ACCESS_KEY;

      if (isValid) {
        this.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
        return true;
      }

      return false;
    },

    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
});

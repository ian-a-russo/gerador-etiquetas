<template>
  <v-container
    fluid
    class="pa-0 d-flex login-wrapper d-flex align-center justify-center"
  >
    <div
      class="login-left d-flex flex-column justify-center align-center pa-1 rounded-xl"
    >
      <div class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold mt-4 text-white">Bem-vindo</h2>
        <p class="text-subtitle-2 text-grey-lighten-1 mt-1">
          Insira sua chave de acesso para continuar
        </p>
      </div>

      <v-card class="login-card pa-6" elevation="10">
        <v-text-field
          v-model="key"
          label="Chave de acesso"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-key"
          density="comfortable"
          color="deep-purple-accent-2"
          hide-details="auto"
        />

        <v-btn
          color="deep-purple-accent-3"
          size="large"
          block
          class="mt-4 text-body-1"
          @click="handleLogin"
        >
          Entrar
        </v-btn>

        <v-alert
          v-if="error"
          type="error"
          class="mt-4"
          border="start"
          density="comfortable"
        >
          Chave inválida.
        </v-alert>
      </v-card>
    </div>

    <!-- Área direita - Ilustração -->
    <div
      class="login-right d-none d-md-flex align-center justify-center bg-transparent"
    >
      <img src="/logo.png" alt="Login Illustration" class="illustration" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/user-auth-store";

const key = ref("");
const error = ref(false);
const router = useRouter();
const auth = useAuthStore();

function handleLogin() {
  error.value = false;
  if (auth.login(key.value)) {
    router.push("/generate");
  } else {
    error.value = true;
  }
}
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #1a0033, #2a003e, #0e0e0e);
  background-size: 400% 400%;
  animation: gradientMove 6s linear infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-left {
  background: linear-gradient(135deg, #4a148c, #8e24aa);
  color: #fff;
  height: auto;
  width: 90%;
  max-width: 400px;
  padding: 32px 16px;
}

.login-card {
  width: 100%;
  max-width: 360px;
  background-color: #1e1e1e;
  border-radius: 16px;
}

.login-right {
  width: 40%;
  background: #0f0f0f;
  position: relative;
  height: 80%;
}

@media (min-width: 960px) {
  .login-left {
    height: 80%;
    width: 35%;
    max-width: none;
    padding: 16px;
  }
}

.illustration {
  max-width: 280px;
  width: 80%;
  filter: drop-shadow(0px 4px 20px rgba(142, 36, 170, 0.4));
}

.text-purple {
  color: #b388ff;
  text-decoration: none;
}

.text-purple:hover {
  text-decoration: underline;
}
</style>

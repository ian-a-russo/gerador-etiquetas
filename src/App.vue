<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

<style>
.bg-custom {
  background: linear-gradient(
    135deg,
    #20005c,
    #20005c,
    #750691,
    #750691,
    #20005c,
    #20005c
  );
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
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
</style>

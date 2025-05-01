<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap');

.v-app-bar {
  background: transparent !important;
  box-shadow: none !important;
}

.v-app-bar .v-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin: 0 4px;
  transition: all 0.3s ease;
}

.v-app-bar .v-btn:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  color: black !important;
  transform: translateY(-2px);
}

.v-app-bar a {
  color: white !important;
  text-decoration: none;
}

.v-app-bar .v-btn:hover a {
  color: black !important;
}
</style>

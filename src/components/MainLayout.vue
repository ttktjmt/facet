<template>
  <v-app>
    <!-- Hero Section -->
    <v-container fluid class="hero-section pa-0" style="height: 100vh; position: relative;">
      <!-- Video Background (bottom layer) -->
      <video
        playsinline
        autoplay
        muted
        loop
        class="hero-video"
        style="position: absolute; min-width: 100%; min-height: 100%; width: auto; height: auto; z-index: 1;"
      >
        <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
      </video>

      <!-- Left Side Navigation -->
      <div style="position: fixed; left: 20px; top: 50%; transform: translateY(-50%); z-index: 11;">
        <v-btn
          v-for="(item, index) in navigationItems"
          :key="index"
          text
          block
          class="mb-2 left-nav-btn"
          @click="scrollToSection(item.target)"
          style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(5px);"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </div>

      <!-- Hero Content Wrapper (top layer) -->
      <div style="position: relative; z-index: 3; height: 100%;">
        <slot name="hero-content"></slot>
      </div>

      <!-- Header -->
      <v-app-bar
        app
        flat
        transparent
        class="hidden-sm-and-down"
        style="z-index: 10;"
      >
        <v-spacer></v-spacer>
        <div style="position: absolute; top: 20px; right: 20px;">
          <v-btn
            href="https://github.com"
            target="_blank"
            text
            style="position: relative; z-index: 11;"
          >
            <v-icon left>mdi-file-pdf-box</v-icon>
            PAPER
          </v-btn>
          <v-btn
            href="https://github.com"
            target="_blank"
            text
            style="position: relative; z-index: 11;"
          >
            <v-icon left>mdi-file-document</v-icon>
            ARXIV
          </v-btn>
          <v-btn
            href="https://github.com"
            target="_blank"
            text
            style="position: relative; z-index: 11;"
          >
            <v-icon left>mdi-video</v-icon>
            VIDEO
          </v-btn>
          <v-btn
            href="https://github.com"
            target="_blank"
            text
            style="position: relative; z-index: 11;"
          >
            <v-icon left>mdi-github</v-icon>
            CODE
          </v-btn>
        </div>
      </v-app-bar>

      <!-- Bottom Navigation -->
      <v-bottom-navigation
        horizontal
        class="hidden-sm-and-down"
        style="position: absolute; bottom: 0; width: 100%; z-index: 4; background: transparent !important;"
      >
        <v-btn text color="black" href="#introduction">Introduction</v-btn>
        <v-btn text color="black" href="#method">Method</v-btn>
        <v-btn text color="black" href="#simulation">Simulation</v-btn>
        <v-btn text color="black" href="#experiments">Experiments</v-btn>
        <v-btn text color="black" href="#results">Results</v-btn>
      </v-bottom-navigation>
    </v-container>

    <!-- Content Sections -->
    <slot></slot>

    <!-- Footer -->
    <v-footer padless>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <p class="mb-4">
              Website template modified from original sources
            </p>
            <p>
              Licensed under Creative Commons Attribution-ShareAlike 4.0
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      navigationItems: [
        { text: 'Introduction', icon: 'mdi-information', target: 'introduction' },
        { text: 'Method', icon: 'mdi-cog', target: 'method' },
        { text: 'Simulation', icon: 'mdi-video', target: 'simulation' },
        { text: 'Results', icon: 'mdi-chart-bar', target: 'real-world' },
        { text: 'Ablation', icon: 'mdi-microscope', target: 'ablation' },
        { text: 'Team', icon: 'mdi-account-group', target: 'team' }
      ]
    }
  },
  methods: {
    scrollToSection(target) {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  overflow: hidden;
}

.hero-background {
  transition: background 0.5s ease;
}

.left-nav-btn {
  min-width: 150px;
  text-align: left !important;
  justify-content: flex-start !important;
  transition: all 0.3s ease;
  opacity: 0.7;  /* Make buttons slightly transparent by default */
}

.left-nav-btn:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  color: black !important;
  transform: translateX(5px);
  opacity: 1;  /* Full opacity on hover */
}

/* Add more custom styles as needed */
</style> 
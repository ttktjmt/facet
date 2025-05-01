<template>
  <v-app>
    <!-- Hero Section -->
    <v-container fluid class="hero-section pa-0" style="height: 100vh; position: relative;">
      <!-- Video Background (bottom layer) -->
      <video playsinline autoplay muted loop class="hero-video"
        style="position: absolute; min-width: 100%; min-height: 100%; width: auto; height: auto; z-index: 1;">
        <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
      </video>

      <!-- Left Side Navigation -->
      <div style="position: fixed; left: 20px; top: 50%; transform: translateY(-50%); z-index: 11;">
        <v-btn v-for="(item, index) in navigationItems" :key="index" text block class="mb-2 nav-btn left-nav-btn"
          @click="scrollToSection(item.target)">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </div>

      <!-- Hero Content Wrapper (top layer) -->
      <div style="position: relative; z-index: 3; height: 100%;">
        <slot name="hero-content"></slot>
      </div>

      <!-- Header -->
      <!-- <v-app-bar app flat transparent class="hidden-sm-and-down" style="">
        <v-spacer></v-spacer> -->
      <div style="position: fixed; top: 20px; right: 20px; z-index: 10;">
        <v-btn v-for="(link, index) in headerLinks" :key="index" :href="link.href" target="_blank" text
          class="nav-btn header-nav-btn mx-1">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.text }}
        </v-btn>
      </div>
      <!-- </v-app-bar> -->
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
      ],
      headerLinks: [
        { text: 'PAPER', icon: 'mdi-file-pdf-box', href: 'https://github.com' },
        { text: 'ARXIV', icon: 'mdi-file-document', href: 'https://github.com' },
        { text: 'VIDEO', icon: 'mdi-video', href: 'https://github.com' },
        { text: 'CODE', icon: 'mdi-github', href: 'https://github.com' }
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

/* Common style for all navigation buttons */
.nav-btn {
  background: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  opacity: 0.7;
  position: relative;
  z-index: 11;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  opacity: 1;
}

/* Left navigation specific styles */
.left-nav-btn {
  min-width: 150px;
  text-align: left !important;
  justify-content: flex-start !important;
}

.left-nav-btn:hover {
  transform: translateX(5px);
}

/* Header navigation specific styles */
.header-nav-btn:hover {
  transform: translateY(-2px);
}

/* Add more custom styles as needed */
</style> 
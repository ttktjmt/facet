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

      <!-- Overlay (middle layer) -->
      <div 
        class="overlay" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.0); z-index: 2;"
      ></div>

      <!-- Hero Content Wrapper (top layer) -->
      <div style="position: relative; z-index: 5; height: 100%;">
        <slot name="hero-content"></slot>
      </div>

      <!-- Header -->
      <v-app-bar
        app
        flat
        transparent
        class="hidden-sm-and-down"
        style="z-index: 4;"
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="black"
          href="#"
          class="mx-2"
        >
          <v-icon left>mdi-file-pdf-box</v-icon>
          Paper
        </v-btn>
        <v-btn
          text
          color="black"
          href="#"
          class="mx-2"
        >
          <v-icon left>mdi-file-document</v-icon>
          arXiv
        </v-btn>
        <v-btn
          text
          color="black"
          href="#"
          class="mx-2"
        >
          <v-icon left>mdi-youtube</v-icon>
          Video
        </v-btn>
        <v-btn
          outlined
          color="black"
          href="#"
          class="mx-2"
        >
          <v-icon left>mdi-github</v-icon>
          Code
        </v-btn>
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
  name: 'MainLayout'
}
</script>

<style scoped>
.hero-section {
  overflow: hidden;
}

.hero-background {
  transition: background 0.5s ease;
}

/* Add more custom styles as needed */
</style> 
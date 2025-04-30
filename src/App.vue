<template>
  <main-layout>
    <!-- Hero Content -->
    <template #hero-content>
      <v-container class="d-flex flex-column justify-center align-center text-center black--text" style="height: 100%;">
        <p class="text-h1 font-weight-bold mb-4">FACET</p>
        <p class="text-h2 mb-4">Force-Adaptive Control via Impedance Reference Tracking for Legged Robots</p>
        <!-- <p class="text-h5">Enabling Natural and Safe Robot Interactions Through Advanced Control</p> -->
      </v-container>
    </template>

    <!-- Introduction Section -->
    <v-container class="py-12" id="introduction">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <!-- Header Image -->
          <v-img src="@/assets/images/head.drawio.png" class="mb-6" contain></v-img>

          <p class="text-h4 text-center mb-6">Introduction</p>
          <div class="text-body-1">
            <p class="mb-4">
              Recent advances in reinforcement learning (RL) for robotics have shown
              incredibly agile movements capable of parkour, dancing, and sophisticated manipulation tasks.
              However, most control policies overlook one crucial aspect:
              responding compliantly to external forces and human interaction.
            </p>
            <p class="mb-4">
              <strong>FACET</strong> introduces a framework for force-adaptive control of legged robots,
              enabling them to interact compliantly with their environment.
              Inspired by impedance control, <strong>FACET</strong> trains a control policy to imitate
              a virtual mass-spring-damper system with RL,
              allowing robots to fine-grained control under external forces by manipulating the virtual spring,
              and smoothly transition between compliant behavior and forceful actions.
            </p>
            <p class="mb-4">
              Key Capabilities:
            </p>
            <v-list>
              <v-list-item>
                <v-icon color="primary" class="mr-2">mdi-shield-check</v-icon>
                <span>Enhanced Safety: Responds naturally to external forces, reducing collision impacts by up to
                  80%</span>
              </v-list-item>
              <v-list-item>
                <v-icon color="primary" class="mr-2">mdi-arm-flex</v-icon>
                <span>Adaptive Strength: Handles significant forces - from gentle guidance to pulling 10kg loads</span>
              </v-list-item>
              <v-list-item>
                <v-icon color="primary" class="mr-2">mdi-robot</v-icon>
                <span>Versatile Application: Successfully implemented across quadrupeds, humanoids, and loco-manipulator
                  systems</span>
              </v-list-item>
            </v-list>
          </div>

          <!-- Technical Summary Video -->
          <v-sheet color="grey lighten-2" class="d-flex align-center justify-center mt-6" style="height: 400px">
            <video width="100%" height="100%" controls style="max-height: 100%">
              <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
            </video>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <!-- Method Section -->
    <v-container class="py-12 grey lighten-4" id="method">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <h2 class="text-h4 text-center mb-6">Method</h2>
          <v-stepper alt-labels :items="['Impedance Control', 'Tracking Model', 'Training']" v-model="show_step">
            <template v-slot:item.1>
              <v-card title="Impedance Control for Fixed-base Manipulators" flat>
                <div class="d-flex">
                  <div class="flex-grow-1 pa-4">
                    <p>
                      Imagine controlling a robot like you're handling a mass connected to a spring:
                      you drag around the other end of the spring, and the mass moves in response.
                      When external forces are applied, the mass will move in the opposite direction of the force,
                      and the spring will push back.
                      That's impedance control in a nutshell.
                    </p>
                    <p class="mt-4">
                      The input to a impedance controller is the specifications for a virtual mass-spring-damper system.
                      Instead of rigidly following fixed position targets, the robot acts as if tethered to a virtual
                      spring
                      - it can flex and adapt when external forces are applied, then smoothly return to its intended
                      position.
                    </p>
                    <p class="pa-4">
                      Mathematically, we compute the desired force at the end-effector as:
                    </p>
                    <math-jax latex="f_{spring} = K_p(x_{des} - x) + K_d(\dot{x}_{des} - \dot{x})" :block="true"
                      class="text-center mb-4" />
                    <p class="pa-4">
                      where:
                    <ul>
                      <li><math-jax latex="K_p" />: spring stiffness (how "rigid" the robot feels)</li>
                      <li><math-jax latex="K_d" />: damping (how quickly oscillations settle)</li>
                      <li><math-jax latex="x_{des}, \dot{x}_{des}" />: desired position and velocity</li>
                      <li><math-jax latex="x, \dot{x}" />: current position and velocity</li>
                    </ul>
                    By adjusting <math-jax latex="K_p" /> and <math-jax latex="K_d" />, we can make the robot more rigid
                    for precise tasks
                    or more compliant for gentle interactions.
                    </p>
                  </div>
                  <div style="width: 40%; min-width: 300px;" class="pl-4">
                    <v-img src="@/assets/videos/imp_ctrl.gif" alt="Impedance Control Demo" contain></v-img>
                  </div>
                </div>
              </v-card>
            </template>

            <template v-slot:item.2>
              <v-card title="Tracking Impedance Reference Model with Temporal Smoothing" flat>
                <v-img src="@/assets/images/method.drawio.png" alt="Reference Model Tracking" class="mt-3"
                  contain></v-img>
                <div class="pa-4">
                  <p class="mb-4">
                    FACET uses a virtual mass-spring-damper system as a reference model to guide the robot's
                    center of mass (CoM) motion. This model defines how the robot should respond to external
                    forces - much like a mass connected to a spring that can naturally compress and extend
                    under forces while maintaining a connection to its target position.
                  </p>

                  <p class="mb-2">The reference model dynamics are defined by:</p>
                  <math-jax
                    latex="m\ddot{x}_{ref} = f_{spring} + f_{ext} = K_p(x_{des} - x_{ref}) + K_d(\dot{x}_{des} - \dot{x}_{ref}) + f_{ext}"
                    :block="true" class="text-center my-4" />
                  <p>where:</p>
                  <ul class="mb-4">
                    <li><math-jax latex="m" />: virtual mass</li>
                    <li><math-jax latex="K_p" />: spring stiffness</li>
                    <li><math-jax latex="K_d" />: spring damping</li>
                    <li><math-jax latex="x_{des}" />: desired position for setpoint</li>
                    <li><math-jax latex="f_{ext}" />: external forces applied on the virtual mass</li>
                  </ul>

                  <p>
                    The robot learns to match this reference behavior through reinforcement learning,
                    enabling control of the robot's CoM behavior by manipulating the virtual spring.
                  </p>

                  <p class="mt-4">
                    To ensure stable and robust behavior, FACET uses temporal smoothing when tracking
                    the reference model. Instead of using a single reference point, it combines multiple
                    trajectory predictions starting from different time points in the robot's recent history.
                  </p>
                </div>
              </v-card>
            </template>

            <template v-slot:item.3>
              <v-card title="Two-Stage Teacher-Student Training" flat>
                <div class="d-flex">
                  <div style="width: 40%; min-width: 300px;" class="pr-4">
                    <v-img src="@/assets/images/teacher-student.drawio.png" alt="Impedance Control Demo" class="mt-3"
                      contain></v-img>
                  </div>
                  <div style="width: 60%;">
                    <p class="pa-4">
                      FACET uses a two-stage teacher-student training approach to facilitate learning and successful
                      sim2real transfer.
                      In the first stage, we train a teacher policy <math-jax latex="\pi^{teacher}" /> with access to
                      privileged information (like precise velocity and force measurements) alongside a state estimator
                      <math-jax latex="\mathcal{E}^{\text{est}}(o_{:t})" /> that learns to predict the
                      features extracted by a privileged encoder <math-jax
                        latex="\mathcal{E}^{\text{priv}}(o_t, o^{priv}_t)" />
                      from the available sensors.
                    </p>
                    <p class="pa-4">
                      In the second stage, a student policy <math-jax latex="\pi^{student}" /> is initialized from the
                      teacher's parameters and further fine-tuned using PPO to work with the estimated features instead
                      of those extracted by the privileged encoder. This approach enables the student to find optimal
                      policies with imperfect state estimation rather than simply imitating the teacher.
                    </p>
                  </div>
                </div>
              </v-card>
            </template>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>

    <!-- Simulation Section -->
    <v-container fluid class="pa-0" id="simulation">
      <v-row no-gutters>
        <v-col cols="12">
          <!-- Full-page video container -->
          <div class="position-relative" style="height: 100vh;">
            <!-- Video display -->
            <v-fade-transition>
              <video v-if="selectedSimVideo == 1" width="100%" height="100%" autoplay loop muted
                style="object-fit: cover; position: absolute; top: 0; left: 0;">
                <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
              </video>
              <video v-if="selectedSimVideo == 2" width="100%" height="100%" autoplay loop muted
                style="object-fit: cover; position: absolute; top: 0; left: 0;">
                <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
              </video>
              <video v-if="selectedSimVideo == 3" width="100%" height="100%" autoplay loop muted
                style="object-fit: cover; position: absolute; top: 0; left: 0;">
                <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
              </video>
            </v-fade-transition>

            <!-- Title Overlay -->
            <div class="position-absolute" style="top: 40px; left: 0; right: 0; z-index: 1;">
              <h2 class="text-h4 text-center white--text">Simulation Training</h2>
            </div>

            <!-- Bottom Tab Navigation -->
            <div class="position-absolute d-flex justify-center" style="bottom: 40px; left: 0; right: 0; z-index: 1;">
              <v-btn-toggle v-model="selectedSimVideo" mandatory rounded background-color="rgba(0, 0, 0, 0.5)"
                class="elevation-4">
                <v-btn value="1" class="px-6">
                  <span class="white--text">G1 Humanoid</span>
                </v-btn>
                <v-btn value="2" class="px-6">
                  <span class="white--text">B1+Z1 Loco-Manipulator</span>
                </v-btn>
                <v-btn value="3" class="px-6">
                  <span class="white--text">Go2 Quadruped</span>
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Real-World Results Section -->
    <v-container class="py-12" id="real-world">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 text-center mb-6">Real-World Results</h2>
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="text-h6">Compliant Following</h3>
              <v-sheet color="grey lighten-2" class="d-flex align-center justify-center mb-4" height="300">
                <video width="100%" height="100%" autoplay loop muted>
                  <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
                </video>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="text-h6">Large Force Pulling</h3>
              <v-sheet color="grey lighten-2" class="d-flex align-center justify-center mb-4" height="300">
                <video width="100%" height="100%" autoplay loop muted>
                  <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
                </video>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Ablation Study Section -->
    <v-container class="py-12 grey lighten-4" id="ablation">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 text-center mb-6">Ablation Study</h2>
          <v-row>
            <v-col cols="12" md="4">
              <v-card elevation="2" class="pa-4 mb-4">
                <h3 class="text-h6 mb-3">Impulse Response</h3>
                <video width="100%" autoplay loop muted>
                  <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
                </video>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card elevation="2" class="pa-4 mb-4">
                <h3 class="text-h6 mb-3">Collision Response</h3>
                <video width="100%" autoplay loop muted>
                  <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
                </video>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card elevation="2" class="pa-4 mb-4">
                <h3 class="text-h6 mb-3">Temporal Smoothing</h3>
                <video width="100%" autoplay loop muted>
                  <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
                </video>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Team Section -->
    <v-container class="py-12 grey lighten-4" id="team">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 text-center mb-6">Our Team</h2>
          <v-row justify="center">
            <v-col cols="12" sm="4" class="text-center">
              <v-avatar size="120" color="grey lighten-2" class="mb-4">
                <v-icon size="64" color="grey darken-2">mdi-account</v-icon>
              </v-avatar>
              <h3 class="text-h6">Botian Xu *</h3>
              <p class="caption">Tsinghua University</p>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-avatar size="120" color="grey lighten-2" class="mb-4">
                <v-icon size="64" color="grey darken-2">mdi-account</v-icon>
              </v-avatar>
              <h3 class="text-h6">Haoyang Weng *</h3>
              <p class="caption">Tsinghua University</p>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-avatar size="120" color="grey lighten-2" class="mb-4">
                <v-icon size="64" color="grey darken-2">mdi-account</v-icon>
              </v-avatar>
              <h3 class="text-h6">Qingzhou Lu *</h3>
              <p class="caption">Tsinghua University</p>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-avatar size="120" color="grey lighten-2" class="mb-4">
                <v-icon size="64" color="grey darken-2">mdi-account</v-icon>
              </v-avatar>
              <h3 class="text-h6">Yang Gao</h3>
              <p class="caption">Tsinghua University</p>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-avatar size="120" color="grey lighten-2" class="mb-4">
                <v-icon size="64" color="grey darken-2">mdi-account</v-icon>
              </v-avatar>
              <h3 class="text-h6">Huazhe Xu</h3>
              <p class="caption">Tsinghua University</p>
            </v-col>
            
          </v-row>
        </v-col>
      </v-row>
    </v-container>

  </main-layout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
import { MathJax } from 'mathjax-vue3'

export default {
  name: 'App',
  components: {
    MainLayout,
    MathJax
  },
  data: () => ({
    show_step: 1,
    selectedSimVideo: 1
  })
}
</script>

<style>
.v-sheet.v-card {
  transition: transform 0.2s;
}

.v-sheet.v-card:hover {
  transform: translateY(-4px);
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}
</style>

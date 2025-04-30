<template>
  <main-layout>
    <!-- Hero Content -->
    <template #hero-content>
      <v-container class="d-flex flex-column justify-center align-center text-center" style="height: 100%;">
        <p style="font-size: 1500%" class="font-weight-bold mb-4"><em>FACET</em></p>
        <p class="text-h2 font-weight-medium mb-4" style="color: rgb(240, 240, 240);">
          <strong><em>F</em></strong>orce-<strong><em>A</em></strong>daptive <strong><em>C</em></strong>ontrol via
          Imp<strong><em>e</em></strong>dance <strong><em>R</em></strong>eference <strong><em>T</em></strong>racking for
          Legged Robots</p>
        <!-- <p class="text-h5">Enabling Natural and Safe Robot Interactions Through Advanced Control</p> -->
      </v-container>
    </template>

    <!-- Introduction Section -->
    <v-container class="py-12" id="introduction">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <p class="text-h4 text-center mb-6">Introduction</p>

          <v-row>
            <v-col cols="12" md="5">
              <div class="text-body-1">
                <p class="mb-4">
                  Recent advances in reinforcement learning (RL) for robotics have shown
                  incredibly agile movements such as parkour, dancing.
                  However, most control policies overlook one crucial aspect:
                  responding adaptively and compliantly to external forces during object manipulation and human
                  interaction.
                </p>
                <p class="mb-4">
                  <strong>FACET</strong> introduces a framework for force-adaptive control of legged robots.
                  Inspired by impedance control, <strong>FACET</strong> trains a control policy to imitate
                  a virtual mass-spring-damper system with RL,
                  allowing fine-grained control under external forces by manipulating the virtual spring,
                  and smoothly transition between compliant behavior and forceful actions.
                </p>
                <p class="mb-4">
                  Such intuitive interface enables a wide range of applications. A high compliance allows the robot to be stopped or kinesthetically guided
                  with ease (a), while a high stiffness allows the robot to exert large forces when pushing/pulling a
                  payload (b). The framework applies to different morphologies and more complex configurations (c).
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="7">
              <v-img src="@/assets/images/head.drawio.png" contain></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="10">
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
          <v-stepper alt-labels
            :items="['Impedance Control', 'Reference Model Tracking', 'Temporal Smoothing', 'Teacher-Student Training']"
            v-model="show_step">
            <template v-slot:item.1>
              <!-- <v-card title="Impedance Control for Fixed-base Manipulators" flat> -->
              <v-card flat height="450px" class="overflow-y-auto">
                <div class="d-flex">
                  <div style="width: 40%;">
                    <p class="mb-4 text-h5" style="line-height: 1.5;">
                      Imagine controlling a robot like you're handling a mass connected to a spring:
                      you drag around the other end of the spring, and the mass moves in response.
                      When external forces are applied, the mass will move in the opposite direction of the force,
                      and the spring will push back.
                      That's impedance control in a nutshell.
                    </p>
                  </div>
                  <div style="width: 60%; min-width: 300px;">
                    <v-img src="@/assets/videos/imp_ctrl.gif" alt="Impedance Control Demo" contain></v-img>
                  </div>
                </div>

                <div class="pa-4">
                  <p class="mt-4">
                    The input to a impedance controller is the specifications for a virtual mass-spring-damper system.
                    Instead of rigidly following fixed position targets, the robot acts as if tethered to a virtual
                    spring
                    - it can flex and adapt when external forces are applied, then smoothly return to its intended
                    position.
                  </p>
                  <p class="mt-4">
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
                  </p>
                  <p class="mt-4">
                    By adjusting <math-jax latex="K_p" /> and <math-jax latex="K_d" />, we can make the robot more
                    rigid
                    for precise tasks or more compliant for gentle interactions.
                  </p>
                </div>

              </v-card>
            </template>

            <template v-slot:item.2>
              <!-- <v-card title="Reference Model Tracking" flat> -->
              <v-card flat height="450px" class="overflow-y-auto">
                <div class="pa-4 d-flex">
                  <div style="width: 40%;">
                    <p class="mb-4 text-h5" style="line-height: 2.0;">
                      <strong>FACET</strong> leverages a virtual mass-spring-damper system as a reference model to guide
                      the robot's
                      center of mass (CoM) motion.
                    </p>

                  </div>
                  <div style="width: 60%; min-width: 300px;" class="pr-4">
                    <v-img src="@/assets/images/method-left.drawio.png" alt="Reference Model Tracking" class="mt-3"
                      contain></v-img>
                  </div>
                </div>


                <div class="pa-4">
                  <p class="mb-2">This model defines how the robot should respond to external
                    forces - much like a mass connected to a spring that can naturally compress and extend
                    under external forces while maintaining a "soft" tracking of its target position.</p>
                  <p class="mb-2">The reference model dynamics are defined by:</p>
                  <math-jax
                    latex="m\ddot{\mathbf{x}}_{\text{ref}} = f_{\text{spring}} + f_{\text{ext}} = K_p(\mathbf{x}_{\text{des}} - \mathbf{x}_{\text{ref}}) + K_d(\dot{\mathbf{x}}_{\text{des}} - \dot{\mathbf{x}}_{\text{ref}}) + f_{\text{ext}}"
                    :block="true" class="text-center my-4" />
                  <p>
                    The robot learns to match this reference behavior through reinforcement learning,
                    enabling control of the robot's CoM behavior by manipulating the virtual spring.
                  </p>
                </div>


              </v-card>
            </template>

            <template v-slot:item.3>
              <!-- <v-card title="Temporal Smoothing of Tracking Targets" flat> -->
              <v-card flat height="450px" class="overflow-y-auto">
                <div class="d-flex">
                  <div style="width: 60%; min-width: 300px;" class="pr-4">
                    <v-img src="@/assets/images/method-right.drawio.png" alt="Reference Model Tracking" class="mt-3"
                      contain></v-img>
                  </div>
                  <div style="width: 40%; min-width: 300px;" class="pr-4">
                    <p class="mb-4 text-h5" style="line-height: 2.0;">
                      <strong>FACET</strong> uses temporal smoothing to balance between open-loop and closed-loop
                      tracking of the
                      reference model.
                    </p>
                  </div>
                </div>
                
                <div class="pa-4">
                  <p class="mb-4">
                    Concretely, the reference state at time <math-jax latex="t" /> is obtained by integrating from an
                    initial time <math-jax latex="t'" />:
                  </p>
                  <math-jax :block="true"
                    latex="\begin{cases} \mathbf{x}_{\text{ref}}(t) = \mathbf{x}_{\text{sim}}(t') + \int_{t'}^t \dot{\mathbf{x}}_{\text{ref}}(t)dt \\ \dot{\mathbf{x}}_{\text{ref}}(t) = \dot{\mathbf{x}}_{\text{sim}}(t') + \int_{t'}^t \ddot{\mathbf{x}}_{\text{ref}}(t)dt \end{cases}"
                    class="text-center mb-4" />
                  <p class="mb-4">
                    This approach addresses two key challenges:
                  <ul>
                    <li>Open-loop tracking (<math-jax latex="t' = 0" />) follows ideal dynamics but ignores physical
                      constraints</li>
                    <li>Closed-loop tracking (<math-jax latex="t' = t - \Delta t" />) is adaptive but can be noisy</li>
                  </ul>
                  </p>
                  <p class="mb-4">
                    The final reward combines multiple tracking targets from different starting points <math-jax
                      latex="t'" />:
                  </p>
                  <math-jax :block="true"
                    latex="r_t = \frac{1}{M} \sum_{t'} \exp(-||\mathbf{x}_{\text{sim}}(t) - \mathbf{x}^{t'}_{\text{ref}}(t)||^2_2) + \exp(-||\dot{\mathbf{x}}_{\text{sim}}(t) - \dot{\mathbf{x}}^{t'}_{\text{ref}}(t)||^2_2)"
                    class="text-center mb-2" />
                  <p>
                    where <math-jax latex="t' \in \{t-8\Delta t, t-16\Delta t, t-32\Delta t\}" /> in our implementation,
                    with <math-jax latex="\Delta t = 0.02s" /> being the control interval.
                  </p>
                </div>
              </v-card>
            </template>

            <template v-slot:item.4>
              <!-- <v-card title="Two-Stage Teacher-Student Training" flat> -->
              <v-card flat height="450px" class="overflow-y-auto">
                <div>
                  <p class="pa-4 text-h5" style="line-height: 2.0;">
                    <strong>FACET</strong> uses a two-stage teacher-student training approach to facilitate learning and
                    successful
                    sim2real transfer.
                  </p>
                </div>
                <div>
                  <v-img src="@/assets/images/teacher-student.drawio.png" alt="Impedance Control Demo" class="mt-3"
                    contain></v-img>
                </div>
                <div>
                  <p class="pa-4">
                    In the first stage, we train a teacher policy <math-jax latex="\pi^{\text{teacher}}" /> with access to
                    privileged information (like precise velocity and force measurements) alongside a state estimator
                    <math-jax latex="\mathcal{E}^{\text{est}}(o_{:t})" /> that learns to predict the
                    features extracted by a privileged encoder <math-jax
                      latex="\mathcal{E}^{\text{priv}}(o_t, o^{\text{priv}}_t)" />
                    from the available sensors.
                  </p>
                  <p class="pa-4">
                    In the second stage, a student policy <math-jax latex="\pi^{\text{student}}" /> is initialized from the
                    teacher's parameters and further fine-tuned using PPO to work with the estimated features instead
                    of those extracted by the privileged encoder. This approach enables the student to find optimal
                    policies with imperfect state estimation rather than simply imitating the teacher.
                  </p>
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
        <v-col cols="12" md="10">
          <h2 class="text-h4 text-center mb-6">Real-World Results</h2>
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="text-h6">Tug of War</h3>
              <v-sheet color="grey lighten-2" class="d-flex align-center justify-center mb-4">
                <video width="100%" height="100%" autoplay loop muted>
                  <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
                </video>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="text-h6">Large Force Pulling</h3>
              <v-sheet color="grey lighten-2" class="d-flex align-center justify-center mb-4" >
                <video width="100%" height="100%" autoplay loop muted>
                  <source src="@/assets/videos/large_force_pulling.mp4" type="video/mp4">
                </video>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="text-h6">Compliant Following</h3>
              <v-sheet color="grey lighten-2" class="d-flex align-center justify-center mb-4" >
                <video width="100%" height="100%" autoplay loop muted>
                  <source src="@/assets/videos/tug_of_war.mp4" type="video/mp4">
                </video>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="text-h6">Compliant to Perturbation</h3>
              <v-sheet color="grey lighten-2" class="d-flex align-center justify-center mb-4" >
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
        <v-col cols="12" md="10">
          <h2 class="text-h4 text-center mb-6">Ablation Study</h2>
          <v-row>
            <v-col cols="12" md="4">
              <v-card elevation="2" class="pa-4 mb-4 h-100">
                <h3 class="text-h6 mb-3">Success Rate vs Peak Impact Force</h3>
                <v-img src="@/assets/images/survival.png" contain class="mb-4"></v-img>
                <p class="text-body-2">
                  FACET demonstrates superior robustness to large impulses compared to baseline policies trained with 
                  velocity tracking (vanilla) and with random impulse perturbations (robust). The success rate remains 
                  high even under significant impact forces.
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card elevation="2" class="pa-4 mb-4 h-100">
                <h3 class="text-h6 mb-3">Planar Trajectory Upon Impulse</h3>
                <v-img src="@/assets/images/traj_impulse.png" contain class="mb-4"></v-img>
                <p class="text-body-2">
                  Planar (xy) trajectory of robot CoM under a 100 Ns lateral impulse with a 400 N peak force. 
                  FACET can compliantly follow the impulse, adapting its velocity to keep balance, unlike the 
                  stiffer responses or failures of the baselines.
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card elevation="2" class="pa-4 mb-4 h-100">
                <h3 class="text-h6 mb-3">Distribution of Collision Impulse</h3>
                <v-img src="@/assets/images/impulse_dist.png" contain class="mb-4"></v-img>
                <p class="text-body-2">
                  Distribution of collision impulse when the robot walks into a virtual wall. FACET achieves a 
                  significantly lower collision impulse, and this can be modulated by adjusting the impedance 
                  parameter Kp, indicating enhanced safety during physical interaction.
                </p>
              </v-card>
            </v-col>
          </v-row>
          <!-- <v-card elevation="2" class="pa-4 mt-6">
            <p class="text-body-1">
              Our method introduces controllable compliance into the policy, allowing it to follow instead of 
              counteract external forces when the forces are too large. We compare our method (FACET) with two 
              baselines: (1) vanilla: a locomotion policy trained with velocity tracking reward, and (2) robust: 
              trained additionally with random impulse domain randomizations. The distribution of perturbations 
              applied during training for FACET and robust are identical (random impulse lasting 0.4~0.6s, 
              peaking 80~200N). Safety is a critical aspect when the robot operates in cluttered environments, 
              where intense collisions can damage both the subject and the robot itself. Our approach enables 
              more compliant behavior upon collision by using small Kp and Kd.
            </p>
          </v-card> -->
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

/* Remove app-bar background and add floating button styles */
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

.v-card.overflow-y-auto {
  overflow-y: auto;
  scrollbar-width: thin;  /* For Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;  /* For Firefox */
}

/* For Webkit browsers (Chrome, Safari) */
.v-card.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.v-card.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.v-card.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}
</style>

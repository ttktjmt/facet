<template>
    <div id="mujoco-container">
        <!-- this is for placing the background demo -->
    </div>
    <div style="position: fixed; top: 20px; right: 20px; z-index: 1000; width: 300px;">
        <v-card>
            <v-tabs v-model="task" bg-color="primary" @update:modelValue="updateTaskCallback()">
                <v-tab value="1">Go2 Walking</v-tab>
                <!-- <v-tab value="2">Go2 Wall</v-tab> -->
            </v-tabs>

            <v-tabs-window v-model="task">
                <v-tabs-window-item value="1">
                    <v-tabs v-model="policy" bg-color="primary" @update:modelValue="updatePolicyCallback()">
                        <v-tab value="facet">Facet</v-tab>
                        <v-tab value="robust">Robust</v-tab>
                        <v-tab value="vanilla">Vanilla</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-tabs-window v-model="policy">
                            <v-tabs-window-item value="facet">
                                <!-- Command Controls Group -->
                                <v-card-text class="pb-0">
                                    <v-checkbox v-model="use_setpoint" @update:modelValue="updateUseSetpointCallback()"
                                        density="compact" hide-details>
                                        <template v-slot:label>
                                            Use Setpoint
                                        </template>
                                    </v-checkbox>
                                    <div class="text-caption text-grey mb-2" v-if="use_setpoint">
                                        Drag the red sphere to command target positions
                                    </div>
                                    <div class="text-caption text-grey mb-2" v-if="!use_setpoint">
                                        Slide to command target velocities
                                    </div>
                                    <v-slider :disabled="use_setpoint || compliant_mode" v-model="command_vel_x" :min="-0.5" :max="1.5" :step="0.1"
                                        label="velocity" hide-details @update:modelValue="updateCommandVelXCallback()">
                                        <template v-slot:append>
                                            <div class="text-caption">{{ command_vel_x }}</div>
                                        </template>
                                    </v-slider>
                                </v-card-text>

                                <!-- Stiffness Controls Group -->
                                <v-card-text class="pb-0">
                                    <div class="text-subtitle-2 mb-2">Stiffness Controls</div>
                                    <v-checkbox v-model="compliant_mode" @update:modelValue="updateCompliantModeCallback()"
                                        density="compact" hide-details>
                                        <template v-slot:label>
                                            Compliant Mode
                                        </template>
                                    </v-checkbox>
                                    <div class="text-caption text-grey mb-2" v-if="compliant_mode">
                                        Stiffness is set to 0
                                    </div>
                                    <div class="text-caption text-grey mb-2" v-if="!compliant_mode">
                                        Slide to set stiffness
                                    </div>
                                    <v-slider :disabled="compliant_mode" v-model="facet_kp" :min="0" :max="24" :step="1" label="stiffness" hide-details
                                        @update:modelValue="updateFacetKpCallback()">
                                        <template v-slot:append>
                                            <div class="text-caption">{{ facet_kp }}</div>
                                        </template>
                                    </v-slider>
                                </v-card-text>

                            </v-tabs-window-item>

                            <v-tabs-window-item value="robust">
                                <!-- add instructions -->
                                <v-card-text class="pb-0">
                                    <div class="text-caption text-grey mb-2">
                                        Slide to set command velocity
                                    </div>
                                </v-card-text>
                                <v-slider v-model="command_vel_x" :min="-0.5" :max="1.5" :step="0.1" label="velocity"
                                    hide-details @update:modelValue="updateCommandVelXCallback()">
                                    <template v-slot:append>
                                        <div class="text-caption">{{ command_vel_x }}</div>
                                    </template>
                                </v-slider>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="vanilla">
                                <!-- add instructions -->
                                <v-card-text class="pb-0">
                                    <div class="text-caption text-grey mb-2">
                                        Slide to set command velocity
                                    </div>
                                </v-card-text>
                                <v-slider v-model="command_vel_x" :min="-0.5" :max="1.5" :step="0.1" label="velocity"
                                    hide-details @update:modelValue="updateCommandVelXCallback()">
                                    <template v-slot:append>
                                        <div class="text-caption">{{ command_vel_x }}</div>
                                    </template>
                                </v-slider>
                            </v-tabs-window-item>
                        </v-tabs-window>

                    </v-card-text>

                    <!-- Force Controls Group -->
                    <v-card-text class="pb-2">
                        <div class="text-subtitle-2 mb-2">Force Controls</div>
                        <div class="text-caption text-grey mb-2">
                            Drag on the robot to apply force
                        </div>
                        <v-btn @click="StartImpulse" color="yellow" block>Impulse</v-btn>
                        <div class="text-caption text-grey mb-2">
                            Click the button to apply an impulse
                        </div>
                    </v-card-text>
                </v-tabs-window-item>


<!-- 
                <v-tabs-window-item value="2">
                    <v-tabs v-model="policy" bg-color="primary" @update:modelValue="updatePolicyCallback()">
                        <v-tab value="facet">Facet</v-tab>
                        <v-tab value="robust">Robust</v-tab>
                        <v-tab value="vanilla">Vanilla</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-tabs-window v-model="policy">
                            <v-tabs-window-item value="facet">
                                <v-slider v-model="facet_kp" :min="0" :max="24" :step="1" label="Kp" hide-details
                                    @update:modelValue="updateFacetKpCallback()">
                                    <template v-slot:append>
                                        <div class="text-caption">{{ facet_kp }}</div>
                                    </template>
                                </v-slider>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="robust">
                            </v-tabs-window-item>

                            <v-tabs-window-item value="vanilla">
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card-text>



                </v-tabs-window-item> -->
            </v-tabs-window>

            <!-- add reset button -->
            <v-btn @click="reset" block text>Reset</v-btn>
        </v-card>


    </div>
</template>


<script>

import { MuJoCoDemo } from '@/mujoco_wasm/examples/main.js';
import load_mujoco from '@/mujoco_wasm/dist/mujoco_wasm.js';

const tasks = {
    "1": "unitree_go2/scene.xml",
    // "2": "unitree_go2/scene_wall.xml"
}

const policies = {
    "facet": "./examples/checkpoints/policy-05-03_21-31.json",
    "robust": "./examples/checkpoints/robust.json",
    "vanilla": "./examples/checkpoints/vanilla.json"
}

export default {
    name: 'DemoPage',
    data: () => ({
        task: '1',
        policy: 'facet',
        facet_kp: 24,
        command_vel_x: 0.0,
        use_setpoint: true,
        compliant_mode: false,
    }),
    methods: {
        async init() {
            const mujoco = await load_mujoco();
            this.demo = new MuJoCoDemo(mujoco);
            await this.demo.init();
            this.demo.main_loop();
            this.demo.params["paused"] = false;
        },
        updateTaskCallback() {
            console.log(this.task);

            this.demo.params["paused"] = true;
            this.demo.params["scene"] = tasks[this.task];
            this.demo.reloadScene();
            this.demo.params["paused"] = false;
        },
        updatePolicyCallback() {
            console.log(this.policy);

            this.demo.params["paused"] = true;
            this.demo.params["policy"] = policies[this.policy];
            this.demo.reloadPolicy();
            if (this.policy === "facet") {
                this.demo.ball.visible = true;
                this.demo.ball.position.set(0, 0.5, 0);
            } else {
                this.demo.ball.visible = false;
            }
            this.demo.params["paused"] = false;
        },
        reset() {
            this.demo.params["paused"] = true;
            this.demo.simulation.resetData();
            this.demo.simulation.forward();
            this.demo.ball.position.set(0, 0.5, 0);
            this.demo.params["paused"] = false;
        },
        updateFacetKpCallback() {
            this.facet_kp = Math.max(this.facet_kp, 12);
            this.facet_kp = Math.min(this.facet_kp, 24);
            this.demo.params["impedance_kp"] = this.facet_kp;
        },
        updateUseSetpointCallback() {
            console.log("use stepoint", this.use_setpoint);
            this.demo.params["use_setpoint"] = this.use_setpoint;
            if (this.use_setpoint) {
                this.command_vel_x = 0.0;
                this.updateCommandVelXCallback();
            }
        },
        updateCommandVelXCallback() {
            console.log("set command vel x", this.command_vel_x);
            this.demo.params["command_vel_x"] = this.command_vel_x;
        },
        updateCompliantModeCallback() {
            this.demo.params["compliant_mode"] = this.compliant_mode;
            if (this.compliant_mode) {
                this.facet_kp = 0;
                this.command_vel_x = 0.0;
                this.demo.params["impedance_kp"] = this.facet_kp;
            } else {
                this.facet_kp = 24;
                this.demo.params["impedance_kp"] = this.facet_kp;
            }
        },
        StartImpulse() {
            console.log("start impulse");
            this.demo.params["impulse_remain_time"] = 0.1;
        }
    },
    mounted() {
        this.init();
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Backspace') {
                this.reset();
            }
        });
    },
    beforeUnmount() {
        this.stopPlotUpdates();
        document.removeEventListener('keydown');
    }
}
</script>

<style scoped>
.v-card {
    transition: transform 0.2s;
}

.v-card:hover {
    transform: translateY(-2px);
}
</style>
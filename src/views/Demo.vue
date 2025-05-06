<template>
    <div id="mujoco-container">
        <!-- this is for placing the background demo -->
    </div>
    <div style="position: fixed; top: 20px; right: 20px; z-index: 1000; width: 300px;">
        <v-card>
            <v-tabs v-model="task" bg-color="primary" @update:modelValue="updateTaskCallback()">
                <v-tab value="1">Go2 Walking</v-tab>
                <v-tab value="2">Go2 Wall</v-tab>
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
                                <v-slider v-model="facet_kp" :min="0" :max="24" :step="1" label="Kp" hide-details
                                    @update:modelValue="updateFacetKpCallback()">
                                    <template v-slot:append>
                                        <div class="text-caption">{{ facet_kp }}</div>
                                    </template>
                                </v-slider>
                                <v-slider v-model="command_vel_x" :min="-0.5" :max="1.5" :step="0.1" label="Vel"
                                    hide-details @update:modelValue="updateCommandVelXCallback()">
                                    <template v-slot:append>
                                        <div class="text-caption">{{ command_vel_x }}</div>
                                    </template>
                                </v-slider>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="robust">
                                <v-slider v-model="command_vel_x" :min="-0.5" :max="1.5" :step="0.1" label="Vel"
                                    hide-details @update:modelValue="updateCommandVelXCallback()">
                                    <template v-slot:append>
                                        <div class="text-caption">{{ command_vel_x }}</div>
                                    </template>
                                </v-slider>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="vanilla">
                                <v-slider v-model="command_vel_x" :min="-0.5" :max="1.5" :step="0.1" label="Vel"
                                    hide-details @update:modelValue="updateCommandVelXCallback()">
                                    <template v-slot:append>
                                        <div class="text-caption">{{ command_vel_x }}</div>
                                    </template>
                                </v-slider>
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card-text>

                    <Line :data="plot_data" :options="plot_options" style="width: 100%; height: 300px;" />
                </v-tabs-window-item>



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



                </v-tabs-window-item>
            </v-tabs-window>

            <!-- add reset button -->
            <v-btn @click="reset" block text>Reset</v-btn>
        </v-card>


    </div>
</template>


<script>

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



import { MuJoCoDemo } from '@/mujoco_wasm/examples/main.js';
import load_mujoco from '@/mujoco_wasm/dist/mujoco_wasm.js';

const tasks = {
    "1": "unitree_go2/scene.xml",
    "2": "unitree_go2/scene_wall.xml"
}

const policies = {
    "facet": "./examples/checkpoints/policy-05-03_21-31.json",
    "robust": "./examples/checkpoints/robust.json",
    "vanilla": "./examples/checkpoints/vanilla.json"
}

const plot_data_ = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    },
    {
      label: 'Data Two',
      backgroundColor: '#7979f8',
      data: [90, 89, 70, 90, 89, 100, 90]
    }
  ]
}

const plot_options_ = {
  responsive: true,
  maintainAspectRatio: true
}


export default {
    name: 'DemoPage',
    components: {
        Line
    },
    data: () => ({
        task: '1',
        policy: 'facet',
        facet_kp: 24,
        command_vel_x: 0.0,

        plot_data: plot_data_,
        plot_options: plot_options_,
        plotUpdateInterval: null,
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
            this.demo.params["paused"] = false;
        },
        reset() {
            this.demo.params["paused"] = true;
            this.demo.simulation.resetData();
            this.demo.simulation.forward();
            this.demo.params["paused"] = false;
        },
        updateFacetKpCallback() {
            this.demo.params["impedance_kp"] = this.facet_kp;
        },
        updateCommandVelXCallback() {
            this.demo.params["command_vel_x"] = this.command_vel_x;
        },
        updatePlotData() {
            const now = new Date();
            
            // Create a new object reference to trigger reactivity
            this.plot_data = {
                labels: Array(7).fill().map((_, i) => {
                    const time = new Date(now - (6-i) * 1000);
                    return time.toLocaleTimeString('en-US', { 
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                }),
                datasets: [
                    {
                        ...this.plot_data.datasets[0],
                        data: [...this.plot_data.datasets[0].data.slice(1), Math.random() * 100]
                    },
                    {
                        ...this.plot_data.datasets[1],
                        data: [...this.plot_data.datasets[1].data.slice(1), Math.random() * 100]
                    }
                ]
            };
        },
        startPlotUpdates() {
            this.plotUpdateInterval = setInterval(() => {
                this.updatePlotData();
            }, 1000);
        },
        stopPlotUpdates() {
            if (this.plotUpdateInterval) {
                clearInterval(this.plotUpdateInterval);
                this.plotUpdateInterval = null;
            }
        }
    },
    mounted() {
        this.init().then(() => {
            this.startPlotUpdates();
        });
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
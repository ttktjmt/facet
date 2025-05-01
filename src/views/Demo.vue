<template>
    <v-container class="pa-8">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="pa-4 mb-6" elevation="4">
                    <v-card-title class="text-h4 mb-4">演示页面</v-card-title>
                    <v-card-text>
                        <p class="text-body-1 mb-4">
                            这是一个使用Vue Router创建的演示页面。您可以在这里添加任何内容，
                            或者使用这个页面作为新功能的测试区域。
                        </p>
                        <p class="text-body-1 mb-4">
                            当前页面展示了Vuetify组件的简单使用示例。
                        </p>
                    </v-card-text>
                </v-card>

                <v-card class="pa-4 mb-6" elevation="4">
                    <v-card-title class="text-h5 mb-4">交互式组件示例</v-card-title>
                    <v-card-text>
                        <v-expansion-panels v-model="openPanel" multiple>
                            <v-expansion-panel>
                                <v-expansion-panel-title>按钮组件</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-btn color="primary" block>主要按钮</v-btn>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-btn color="secondary" block>次要按钮</v-btn>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-btn color="error" block>错误按钮</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title>表单示例</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-form @submit.prevent="submitForm">
                                        <v-text-field v-model="form.name" label="姓名" required></v-text-field>
                                        <v-text-field v-model="form.email" label="电子邮件" type="email"
                                            required></v-text-field>
                                        <v-textarea v-model="form.message" label="留言" rows="3"></v-textarea>
                                        <v-btn type="submit" color="success" class="mt-4">提交</v-btn>
                                    </v-form>
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title>数据展示</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-data-table :headers="headers" :items="items" class="elevation-1"></v-data-table>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>

                <v-card class="pa-4" elevation="4">
                    <v-card-title class="text-h5 mb-4">返回首页</v-card-title>
                    <v-card-text>
                        <p class="text-body-1 mb-4">
                            点击下方按钮返回到FACET主页面，查看更多有关项目的信息。
                        </p>
                        <v-btn color="primary" to="/">返回首页</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'DemoPage',
    data: () => ({
        openPanel: [0], // 默认打开第一个面板
        form: {
            name: '',
            email: '',
            message: ''
        },
        headers: [
            { title: 'ID', key: 'id' },
            { title: '名称', key: 'name' },
            { title: '类别', key: 'category' },
            { title: '状态', key: 'status' }
        ],
        items: [
            {
                id: 1,
                name: '项目A',
                category: '研发',
                status: '进行中'
            },
            {
                id: 2,
                name: '项目B',
                category: '测试',
                status: '已完成'
            },
            {
                id: 3,
                name: '项目C',
                category: '部署',
                status: '计划中'
            }
        ]
    }),
    methods: {
        submitForm() {
            alert(`表单已提交！\n姓名: ${this.form.name}\n电子邮件: ${this.form.email}\n留言: ${this.form.message}`);
            this.form.name = '';
            this.form.email = '';
            this.form.message = '';
        }
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
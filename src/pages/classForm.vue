<template>
    <div class="classForm">
        <el-select v-model="value" placeholder="班级" @change="selectStuForm" filterable clearable>
            <el-option
                v-for="item in classForm"
                :key="item.label"
                :label="item.label"
                :value="item.value"
                size="mini">
                <span>{{ item.label }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name: "classForm",
    data() {
        return {
            value: "",
            classForm: [
                { label: "2014级", value: "2014" },
                { label: "2015级", value: "2015" },
                { label: "201672班", value: "201672" }
            ]
        };
    },
    methods: {
        selectStuForm: function(val) {
            console.log(val);
            var params = {
                grade: val
            };
            this.$http.post(this.$api.selectAllStu, params).then(res => {
                console.log(res.data.result);
            });
        }
    }
};
</script>

<style>
</style>
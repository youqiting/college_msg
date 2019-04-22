<template>
    <div>
        <el-form :model="recruit">
            <el-form-item label="公司名称：" :label-width="formLabelWidth">
                <el-input v-model="recruit.company" prefix-icon="el-icon-search" clearable></el-input>
            </el-form-item>
            <el-form-item label="公司地址：" :label-width="formLabelWidth">
                <el-input v-model="recruit.address" prefix-icon="el-icon-location" clearable></el-input>
            </el-form-item>
            <el-form-item label="岗位：" :label-width="formLabelWidth">
                <el-input v-model="recruit.post" prefix-icon="el-icon-caret-right" clearable></el-input>
            </el-form-item>
            <el-form-item label="岗位描述：" :label-width="formLabelWidth">
                <el-input v-model="recruit.postDesc" type="textarea" :rows="2" prefix-icon="el-icon-star-off" clearable></el-input>
            </el-form-item>
            <el-form-item label="要求：" :label-width="formLabelWidth">
                <el-input v-model="recruit.required" type="textarea" :rows="2" clearable></el-input>
            </el-form-item>
            <el-form-item label="工资：" :label-width="formLabelWidth">
                <el-input v-model="recruit.salary" prefix-icon="el-icon-more" clearable></el-input>
            </el-form-item>
            <el-form-item label="相关事项：" :label-width="formLabelWidth">
                <el-input v-model="recruit.relation" prefix-icon="el-icon-info" clearable></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="pulicRecruit()" icon="el-icon-circle-plus-outline"> 发布</el-button>
            <el-button type="text" icon="el-icon-delete"></el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formLabelWidth: "120px",
            recruit:{
                company: '',
                address: '',
                post: '',
                postDesc: '',
                required: '',
                salary: '',
                relation: ''
            }
        }
    },
    methods:{
        pulicRecruit:function(){
            var params = this.recruit;
            this.$http.post(this.$api.pulicRecruit, params).then(res=>{
                console.log(res.data.code);
                if(res.data.code == 1){
                    this.$message("发布成功");
                }else{
                    this.$message("发布失败");
                }
            })
        }
    }
}
</script>

<style>
</style>


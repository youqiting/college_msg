<template>
    <div>
        <div class="stuDesign">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="学生信息" name="1">
                    <div>学校:{{this.stuInfo.profession}}</div>
                    <div>专业：{{this.stuInfo.profession}}</div>
                    <div>年级：{{this.stuInfo.grade}}</div>
                    <div>班级：{{this.stuInfo.class_name}}</div>
                    <div>学号：{{this.stuInfo.student_id}}</div>
                    <div>姓名：{{this.stuInfo.student_name}}</div>
                </el-collapse-item>
                <el-collapse-item title="我的毕业设计" name="2" v-if="this.stuDesign !=null">
                    <div>教师姓名：{{this.stuDesign.teacher_name}}</div>
                    <div>课题名称：{{this.stuDesign.design_subject}}</div>
                </el-collapse-item>
                <el-collapse-item title="我的毕业设计" name="2" v-else>
                    <div>no data !</div>
                </el-collapse-item>
            </el-collapse>       
        </div>
    </div>
</template>

<script>
export default {
    name:'myDesign',
    data(){
        return{
            grade: localStorage.getItem('username').substring(0,4),
            name: localStorage.getItem('name'),
            stuDesign:{},
            stuInfo:{},
            activeNames: ['1']
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.selectStuByName();
            this.selectStuDesign();
        })
    },
    methods:{
        //获取学生的信息 专业
        selectStuByName:function(){
            var params = {
                grade: this.grade,
                name: this.name
            }
            this.$http.post(this.$api.selectStuByName, params).then(res=>{
                this.stuInfo = res.data.result[0];
                console.log(this.stuInfo);
            })
        },
        
        //获取学生的毕设课题
        selectStuDesign:function(){
            var params = {
                grade: this.grade,
                name: this.name
            }
            this.$http.post(this.$api.selectDesignByStu, params).then(res=>{
                this.stuDesign = res.data.result[0];
                console.log(this.stuDesign);
            })
        }

    }
}
</script>

<style>
.stuDesign{
    width: 80%;
}
.el-collapse-item .el-collapse-item__header{
    font-weight: 800;
    font-size: 18px;
    color: #f26363b8;
}
</style>
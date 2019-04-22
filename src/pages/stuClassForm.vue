<template>
    <div class="classForm">
        <el-row class="classForm_title">
            <el-col :span="6">年级</el-col>
            <el-col :span="6">班别</el-col>
            <el-col :span="6">学号</el-col>
            <el-col :span="6">姓名</el-col>
        </el-row>
        <div>
            <el-row class="classForm_content" v-for="(item, index) in stu_form" :key="index">
                <el-col :span="6">{{item.grade}}</el-col>
                <el-col :span="6">{{item.class_name}}</el-col>
                <el-col :span="6">{{item.student_id}}</el-col>
                <el-col :span="6">{{item.student_name}}</el-col> 
            </el-row>
            <div>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="this.stu_formLength">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "classForm",
    data() {
        return {
            grade: localStorage.getItem('username').substring(0, 4),
            name: localStorage.getItem('name'),
            class_name: '',
            stu_form:[],
            stu_formLength: 0,
            currentPage: 1,
        };
    },
    mounted:function(){
        this.$nextTick(function(){
            this.selectStuClassName();
        })
    },
    methods: {
        //获取指定我的班级
        selectStuClassName:function(){
            var params = {
                grade: this.grade,
                name: this.name
            };
            this.$http.post(this.$api.selectStuByName, params).then(res => {
                this.class_name = res.data.result[0].class_name;
                console.log("class_name: "+ this.class_name);
                this.selectStuClassForm(this.class_name);
            });
        },

        //获取 本班班级的花名册
        selectStuClassForm:function(class_name){
            var params = {
                    grade: this.grade,
                    class_name: class_name
                };
            console.log("params:"+params);console.log(3);
            this.$http.post(this.$api.selectStuClassForm, params).then(res => {console.log(4);
                console.log(res.data.result);
                var data = res.data.result;
                this.stu_formLength = data.length;
                var indexStart = (this.currentPage-1) *10;
                var indexEnd = this.currentPage *10;
                this.stu_form = data.slice(indexStart, indexEnd);
            });
        },

        //改变页码
        handleCurrentChange:function(){
            console.log(this.currentPage);
            this.selectStuClassForm(this.class_name);
        }

    }
};
</script>

<style>
.classForm{
    text-align: center;
}
.classForm_title{
    height: 50px;
    font-size: 23px;
    font-weight: bold;
    line-height: 50px;
    background-color: #f2bfbfab;
}
.classForm_content{
    margin: 2px 0;
    padding: 3px 0;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    background-color: #eebdbd36;
}
</style>
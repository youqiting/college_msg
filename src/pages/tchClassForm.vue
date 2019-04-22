<template>
    <div>
        <el-select v-model="value" placeholder="请选择" @change="selectStuClassForm" clearable>
            <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label">
                <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-option-group>
        </el-select>
        <div class="classForm">
            <el-row class="classForm_title" v-if="this.value != null">
                <el-col :span="6">年级</el-col>
                <el-col :span="6">班别</el-col>
                <el-col :span="6">学号</el-col>
                <el-col :span="6">姓名</el-col>
            </el-row>
            <el-row class="classForm_content" v-for="(item, index) in stu_form" :key="index">
                <el-col :span="6">{{item.grade}}</el-col>
                <el-col :span="6">{{item.class_name}}</el-col>
                <el-col :span="6">{{item.student_id}}</el-col>
                <el-col :span="6">{{item.student_name}}</el-col> 
            </el-row>
            <el-row  v-if="this.value == null">
                no data
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
            value: "",
            oldValue: "",
            options: [{
                    label: '2014级',
                    options: [{
                        value: '本科20141271',
                        label: '本科20141271'
                    }, {
                        value: '本科20141272',
                        label: '本科20141272'
                    }]
                },{
                    label: '2015级',
                    options: [{
                        value: '本科20151271',
                        label: '本科20151271'
                    }, {
                        value: '本科20151272',
                        label: '本科20151272'
                    }]
                },{
                    label: '2016级',
                    options: [{
                        value: '本科20161271',
                        label: '本科20161271'
                    }, {
                        value: '本科20161272',
                        label: '本科20161272'
                    }]
                }],
            stu_form:[],
            stu_formLength: 0,
            currentPage: 1,
        };
    },
    methods: {
        //获取指定班级的花名册
        selectStuClassForm:function(){
            if(this.value != null){
                var grade = this.value.substring(2, 6);
                console.log(this.value + "," + grade);
                var params = {
                    grade : grade, 
                    class_name: this.value
                };
                this.$http.post(this.$api.selectStuClassForm, params).then(res => {
                    console.log(res.data.result);
                    var data = res.data.result;
                    this.stu_formLength = data.length;
                    var indexStart = (this.currentPage-1) *10;
                    var indexEnd = this.currentPage *10;
                    this.stu_form = data.slice(indexStart, indexEnd);
                });
            }else{
                this.currentPage = 1;
                this.value = null;
            }
            
        },

        //改变页码
        handleCurrentChange:function(){
            console.log(this.currentPage);
            this.selectStuClassForm();
        }

    }
};
</script>

<style>
.el-select{
    margin-bottom: 10px;
}
.classForm{
    text-align: center;
}
.classForm_title{
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    line-height: 40px;
    background-color: #f2bfbfab;
}
</style>
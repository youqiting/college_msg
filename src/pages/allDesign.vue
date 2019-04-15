<template>
    <div>
        <div>
            <el-select v-model="value" placeholder="教师名"
                    @change="selectTeacher" 
                    filterable clearable>
                <el-option
                    v-for="item in tchName"
                    :key="item.teacher_name"
                    :label="item.teacher_name"
                    :value="item.teacher_name"
                    size="mini">
                    <span style="float: left">{{ item.teacher_name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.teacher_id }}</span>
                    </el-option>
            </el-select>
        </div>
        <div class="designForm">
            <el-row class="title">
                <el-col :span="2">
                    <div>年级</div>
                </el-col>
                <el-col :span="3">
                    <div>教师编号</div>
                </el-col>
                <el-col :span="3">
                    <div>教师姓名</div>
                </el-col>
                <el-col :span="10">
                    <div>课题</div>
                </el-col>
                <el-col :span="3">
                    <div>选该题的学生</div>
                </el-col>
                <el-col :span="3">
                    <div>选择课题</div>
                </el-col>
            </el-row>
            <el-row class="content" v-for="(item, index) in design" :key='index'>
                <el-col :span="2">
                    <div>{{item.grade}}</div>
                </el-col>
                <el-col :span="3">
                    <div>{{item.teacher_id}}</div>
                </el-col>
                <el-col :span="3">
                    <div>{{item.teacher_name}}</div>
                </el-col>
                <el-col :span="10">
                    <div>{{item.design_subject}}</div>
                </el-col>
                <el-col :span="3">
                    <div>&nbsp;{{item.chooseMsg}}</div>
                </el-col>
                <el-col :span="3">
                    <div style="margin-top:10px;">
                        <el-radio v-model="chooseDesign" @change="choose_design()">选择</el-radio>
                    </div>
                </el-col>
            </el-row>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="this.designLength">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name:'allDesign',
    data(){
        return{
            grade : localStorage.getItem('username').substring(0,4),
            tchName:[],
            value:'',
            design:[],
            chooseDesign:false,
            page: 1 ,
            currentPage: '',
            designLength: 0
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.handleCurrentChange(this.page);
        });
    },
    methods:{
        //遍历 毕设题目
        select_design:function(){
            var params ={
                form: "design" + this.grade,
                page:this.currentPage
            }
            this.$http.post(this.$api.selectDesign, params).then(res=>{
                var data = res.data.result;
                this.designLength = data.length;
                var tchNameStr= '';
                data.forEach((item, index)=>{
                    var arr ={teacher_name:'',teacher_id:''};
                    if(tchNameStr.indexOf(item.teacher_name)< 0){
                        tchNameStr += item.teacher_name + ",";
                        arr.teacher_name = item.teacher_name;
                        arr.teacher_id = item.teacher_id;
                        this.tchName.push(arr);
                    }
                });
                var indexStart = (this.currentPage-1) *10;
                var indexEnd = this.currentPage *10;
                this.design = data.slice(indexStart, indexEnd);
            })
        },

        //搜索教师课题
        selectTeacher:function(val){
            var params={
                form: "design" + this.grade,
                name : val
            }
            this.$http.post(this.$api.selectDesignByTch, params).then(res=>{
                var data = res.data.result;
                this.designLength = data.length;
                var indexStart = (this.currentPage-1) *10;
                var indexEnd = this.currentPage *10;
                this.design = data.slice(indexStart, indexEnd);
            })
        },

        //选中
        choose_design:function(){
            console.log(this.chooseDesign);
        },

        //当前页改变时--
        handleCurrentChange(val) {
            this.currentPage = val;
            if(this.value ==''){
                this.select_design();
            }else{
                this.selectTeacher();
            }
        }
    }
}
</script>

<style>
.designForm{
    text-align: center;
}
.title{
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
}
.content{
    padding:15px 0;
    height: auto;
    line-height: 25px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
}
</style>




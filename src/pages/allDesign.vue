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
                <el-col :span="3" class="choose_stu">
                    <div v-html="item.chooseMsg"></div>
                </el-col>
                <el-col :span="3">
                    <!-- <div>
                        <el-button type="text" :id="'choose_'+item.id" @click="choose_design(item.id)">选择</el-button>
                    </div>  v-if="item.chose == false"-->
                    <div>
                        <el-button type="text" :class="{'is-disabled': chooseFlag == true }" @click="choose(item.id)">选择</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="7"
                layout="prev, pager, next, jumper"
                :total="this.designLength">
            </el-pagination>
            <div >
                指导老师：{{this.stu_design.teacher_name}}<br/>
                课题名称：{{this.stu_design.design_subject}}  
            </div>
            <el-button type="text" @click="selectDesignByStu()">学生课题名</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'allDesign',
    data(){
        return{
            grade: localStorage.getItem('username').substring(0,4),
            value: null,
            oldValue: '',
            tchNameStr: '',
            tchName: [],
            design: [],
            chooseFlag:'false',
            currentIndex: '',
            currentPage: 1,
            designLength: 0,
            stu_design: {}
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.select_design();
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
                data.forEach((item, index)=>{
                    var arr ={teacher_name:'',teacher_id:''};
                    if(this.tchNameStr.indexOf(item.teacher_name)< 0){
                        this.tchNameStr += item.teacher_name + ",";
                        arr.teacher_name = item.teacher_name;
                        arr.teacher_id = item.teacher_id;
                        this.tchName.push(arr);
                    }
                    if(item.chooseMsg !=null){
                        item.chooseMsg = item.chooseMsg.replace(/,/g, "<br/>").replace(/，/g,"<br/>");
                    }else{
                        item.chooseMsg = "&nbsp;";
                    } 
                    if(item.chooseMsg.indexOf(localStorage.getItem('name'))>= 0){
                        this.stu_design = item;
                        console.log(item.chooseMsg.indexOf(localStorage.getItem('name'))+",item.chooseMsg:"+item.chooseMsg);
                        console.log("this.stu_design:"+this.stu_design);
                    }
                });
                var indexStart = (this.currentPage-1) *7;
                var indexEnd = this.currentPage *7;
                this.design = data.slice(indexStart, indexEnd);
            })
        },

        //搜索教师课题
        selectTeacher:function(val){
            if(val == null){
                this.currentPage = 1;
                this.select_design();
            }else{
                if(this.oldValue != val){
                    this.currentPage = 1;
                }
                var params={
                    form: "design" + this.grade,
                    name : val
                }
                this.$http.post(this.$api.selectDesignByTch, params).then(res=>{
                    var data = res.data.result;
                    this.designLength = data.length;
                    data.forEach((item, index)=>{
                        if(item.chooseMsg !=null){
                            item.chooseMsg = item.chooseMsg.replace(/,/g, "<br />").replace(/，/g,"<br />");
                        }else if(item.chooseMsg == '' || item.chooseMsg == null){
                            item.chooseMsg = "&nbsp;";
                        }
                    });
                    var indexStart = (this.currentPage-1) *7;
                    var indexEnd = this.currentPage *7;
                    this.design = data.slice(indexStart, indexEnd);
                })
            }
            this.oldValue = val;
        },

        choose:function(id){
            this.chooseFlag = true;
            this.currentIndex = id;
            console.log("this.currentIndex:"+ id);
        },

        //数据库更新选中值
        updateChoose:function(id, chooseMsg){
            var params = {
                form: "design" + this.grade,
                id: id,
                chooseMsg: chooseMsg
            }
            this.$http.post(this.$api.updateChoose, params).then(res=>{
                var data = res.data.result;
                console.log(data);
            })
        },

        //当前页改变时--
        handleCurrentChange(val) {
            this.currentPage = val;
            if(this.value == null){
                this.select_design();
            }else{
                this.selectTeacher(this.value);
            }
        },

        //课题名称
        selectDesignByStu:function(){
            var params = {
                form: "design" + this.grade, 
                name: localStorage.getItem('name')
            }
            this.$http.post(this.$api.selectDesignByStu, params).then(res=>{
                this.stu_design = res.data.result;
            })
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
.choose_stu{
    font-size: 14px;
}
.el-pagination{
    margin-top: 10px;
}
</style>




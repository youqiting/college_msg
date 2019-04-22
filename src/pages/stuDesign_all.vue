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
                    <div v-html="item.chooseMsg">&nbsp;</div>
                </el-col>
                <el-col :span="3">
                    <div>
                        <el-button type="text" :class="{'is-disabled': chooseFlag == true }" @click="chooseNewDesign(item.id)">选择</el-button>
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
            <div class="stu_design">
                <strong>你选择的是</strong> <br/>
                指导老师：{{this.stu_design.teacher_name}}<br/>
                课题名称：{{this.stu_design.design_subject}}  
            </div>
            <div class="design_button">
                <el-button type="primary" @click="submitChoose()">提交/确认更改</el-button>
                <el-button type="primary" @click="chooseAgain()">重新选择</el-button>
            </div>
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
            stu_design: {},
            oldDesign: {}
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
                grade: this.grade,
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
                        this.oldDesign = this.stu_design;
                        console.log("选题id:"+this.stu_design.id);
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
                    grade: this.grade,
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

        //当前页改变时--
        handleCurrentChange(val) {
            this.currentPage = val;
            if(this.value == null){
                this.select_design();
            }else{
                this.selectTeacher(this.value);
            }
        },

        //选择新毕设题目
        chooseNewDesign:function(id){
            this.oldDesign = this.stu_design;
            this.chooseFlag = true;
            this.currentIndex = id;
            console.log("this.currentIndex:"+ id);
            var params = {
                grade: this.grade, 
                id: id
            }
            this.$http.post(this.$api.selectDesignById, params).then(res=>{
                this.stu_design = res.data.result[0];
                console.log(this.stu_design.teacher_name+","+this.stu_design.design_subject);
                console.log(this.stu_design.chooseMsg);
            })
        },

        //submitChoose  确认提交后
        submitChoose:function(){
            console.log("newDesign.id:"+this.stu_design.id+",oldDesign.id:"+this.oldDesign.id);
            if(this.stu_design.id != this.oldDesign.id){
                var params ={
                    form: "design" + this.grade
                }
                this.$http.post(this.$api.selectDesign, params).then(res=>{
                    var data = res.data.result;
                    data.forEach((item, index)=>{
                        if(item.id == this.stu_design.id){
                            console.log("old:"+ item.chooseMsg);
                            if(item.chooseMsg == null){
                                 item.chooseMsg =  localStorage.getItem('username')+ localStorage.getItem('name');
                            }
                            if(item.chooseMsg.indexOf(localStorage.getItem('name'))<0){
                                item.chooseMsg +=  ","+localStorage.getItem('username')+ localStorage.getItem('name');
                            }
                            console.log("新:"+ item.chooseMsg);
                            this.updateChoose(item.id, item.chooseMsg);
                        }
                        if(item.id == this.oldDesign.id){
                            var msg = localStorage.getItem('username')+ localStorage.getItem('name');
                            item.chooseMsg =  item.chooseMsg.replace(msg, '');
                            if(item.chooseMsg[item.chooseMsg.length-1] == ","){
                                item.chooseMsg = item.chooseMsg.substring(0,item.chooseMsg.length-1);
                            }
                            console.log("修改后："+item.chooseMsg);
                            this.updateChoose(item.id, item.chooseMsg);
                        }
                    });
                })
            }else{
                this.$message("选题没变");
            }
            this.$router.push('/allDesign');
        },

        //数据库更新选中值
        updateChoose:function(id, chooseMsg){
            var params = {
                grade: this.grade,
                id: id,
                chooseMsg: chooseMsg
            }
            this.$http.post(this.$api.updateChoose, params).then(res=>{
                var data = res.data.result;
                console.log(data);
            })
        },

        //重新选择
        chooseAgain:function(){
            this.chooseFlag = false;
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
.stu_design{
    margin: 10px 10px;
    height: 75px;
    text-align: left;
    font-size: 16px;
    line-height: 25px;
    color: rgba(55, 55, 255, 0.945);
    background-color: rgba(55, 55, 255, 0.082);
}
</style>




<template>
    <div class="practice">
        <div class="practice_warp">
            <div class="connent" v-for="(item,index) in practiceInfo" :key="index">
                指导老师：<span></span>{{item.teacher_name}} <br />
                指导老师电话：<span></span>{{item.teacher_tel}} <br />
                实习公司：<span></span>{{item.practice_company}} <br />
                实习岗位：<span></span>{{item.post}} <br />
                实习期间：<span></span>{{item.practice_time}} <br />
                实习多久（月）：<span></span>{{item.practice_long}} <br />
                实习类型：<span></span>{{item.practice_type}} <br />
                实习公司联系人：<span></span>{{item.relation_name}} <br />
                实习公司联系人电话：<span></span>{{item.relation_tel}} <br />
                安排形式：<span></span>{{item.arange}} <br />
                企业是否录用：<span></span>{{item.company_taken}} <br />
                是否突破《规定》第十条要求：<span></span>{{item.tenBreak}} <br />
                是否突破《规定》第十六条要求：<span></span>{{item.sixteenBreak}} <br />
                工作变动记录（可不填）：<span></span>{{item.changed}} <br />
                备注（可不填）：<span></span>{{item.remark}} <br />
            </div>
            <div class="button">
                <!-- Form -->
                <el-button type="primary" @click="dialogFormVisible = true">填写/修改实习信息</el-button> 
                <el-dialog title="实习信息" :visible.sync="dialogFormVisible" v-for="(item,index) in practiceInfo" :key="index">
                    <el-form :model="form" >
                        <el-form-item label="指导老师：" :label-width="formLabelWidth">
                            <el-input v-model="item.teacher_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="指导老师电话：" :label-width="formLabelWidth">
                            <el-input v-model="item.teacher_tel" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习公司：" :label-width="formLabelWidth">
                            <el-input v-model="item.practice_company" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习岗位：" :label-width="formLabelWidth">
                            <el-input v-model="item.post" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习期间：" :label-width="formLabelWidth">
                            <el-col :span="7">
                                <el-date-picker type="date" placeholder="选择日期" v-model="item.date_1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"
                                                @change="dateChange_1">
                                </el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">至</el-col>
                            <el-col :span="7">
                                <el-date-picker type="date" placeholder="选择日期" v-model="item.date_2" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  style="width: 100%;"
                                                @change="dateChange_2">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="实习多久（月）：" :label-width="formLabelWidth">
                            <el-input v-model="item.practice_long" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习类型：" :label-width="formLabelWidth">
                            <el-input v-model="item.practice_type" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习公司联系人：" :label-width="formLabelWidth">
                            <el-input v-model="item.relation_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习公司联系人电话：" :label-width="formLabelWidth">
                            <el-input v-model="item.relation_tel" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="安排形式：" :label-width="formLabelWidth">
                            <el-input v-model="item.arange" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="企业是否录用：" :label-width="formLabelWidth">
                            <el-input v-model="item.company_taken" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否突破《规定》第十条要求：" :label-width="formLabelWidth">
                            <el-input v-model="item.tenBreak" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否突破《规定》第十六条要求：" :label-width="formLabelWidth">
                            <el-input v-model="item.sixteenBreak" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="工作变动记录（可不填）：" :label-width="formLabelWidth">
                            <el-input v-model="item.changed" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注（可不填）：" :label-width="formLabelWidth">
                            <el-input v-model="item.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updatePractice(item)">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            practiceInfo:[],
            dialogFormVisible: false,
            form: {
                teacher_name: '',
                teacher_tel: '',
                practice_time:'',
                date_1:'',
                date_2:'',
                practice_type:'',
                practice_long:'',
                practice_company:'',
                relation_name:'',
                relation_tel:'',
                arrange:'',
                post:'',
                company_taken:'',
                tenBreak:'', 
                sixteenBreak:'', 
                changed:'', 
                remark:''
            },
            formLabelWidth: '120px',
            username: localStorage.getItem('username')
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.selectPractice();
        });
    },
    methods:{
        dateChange_1:function(val){
            this.form.date1=val;
        },
        dateChange_2:function(val){
            this.form.date_2=val;
        },

        //查询实习信息
        selectPractice:function(){
            var grade = this.username.substring(0,4);
            var name = localStorage.getItem('name');
            var type = localStorage.getItem('type');
            var params = {
                name : name,
                type : type,
                grade : grade
            };
            console.log("params:"+params);
            this.$http.post(this.$api.selectPractice, params).then(res=>{
                this.practiceInfo = res.data.result;
            })
        },

        // 填写/修改实习信息
        updatePractice:function(practiceInfo){
            var grade = this.username.substring(0,4);
            console.log(practiceInfo);
            var params ={
                name : localStorage.getItem('name'),
                grade : grade,
                teacher_name : practiceInfo.teacher_name,
                teacher_tel : practiceInfo.teacher_tel,
                practice_time : practiceInfo.date_1+"至"+practiceInfo.date_2,
                practice_type : practiceInfo.practice_type,
                practice_long : practiceInfo.practice_long,
                practice_company : practiceInfo.practice_company,
                relation_name : practiceInfo.relation_name,
                relation_tel : practiceInfo.relation_tel,
                arrange : practiceInfo.arrange,
                post : practiceInfo.post,
                company_taken : practiceInfo.company_taken,
                tenBreak : practiceInfo.tenBreak, 
                sixteenBreak : practiceInfo.sixteenBreak, 
                changed : practiceInfo.changed, 
                remark : practiceInfo.remark
            }
            console.log(params);
            this.$http.post(this.$api.updatePractice, params).then(res=>{
                console.log("result:"+ res.data.code);
                if(res.data.code == 1){
                    this.$message("提交成功");
                    this.dialogFormVisible = false;
                    this.$router.push('/practiceInfo');
                }else{
                    this.$message("提交失败");
                }
            })
        }
    }
}
</script>


<style>
.practice{
    height: 1200px;
    width: 88%;
}
.practice_warp{
    padding: 0 15px;
    height: 100%;
    width: 100%;
}
.connent{
    width: 88%;
    font-size: 16px;
    line-height: 28px;
}
.connent > span{
    display: inline-block;
    width: 20px;
    height: 16px;
}
.button{
    position: absolute;
    right: 72px;
    top: 107px;
}
</style>

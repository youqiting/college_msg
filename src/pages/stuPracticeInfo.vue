<template>
    <div class="practice">

        <!-- 学生用户 -->
        <div class="practice">
            <h3 style="color:#9093997d">实习信息</h3>
            <div class="connent">
                指导老师：
                <span></span>
                {{this.practiceInfo.teacher_name}}
                <br>指导老师电话：
                <span></span>
                {{this.practiceInfo.teacher_tel}}
                <br>实习公司：
                <span></span>
                {{this.practiceInfo.practice_company}}
                <br>实习岗位：
                <span></span>
                {{this.practiceInfo.post}}
                <br>实习期间：
                <span></span>
                {{this.practiceInfo.practice_time}}
                <br>实习多久（月）：
                <span></span>
                {{this.practiceInfo.practice_long}}
                <br>实习类型：
                <span></span>
                {{this.practiceInfo.practice_type}}
                <br>实习公司联系人：
                <span></span>
                {{this.practiceInfo.relation_name}}
                <br>实习公司联系人电话：
                <span></span>
                {{this.practiceInfo.relation_tel}}
                <br>安排形式：
                <span></span>
                {{this.practiceInfo.arange}}
                <br>企业是否录用：
                <span></span>
                {{this.practiceInfo.company_taken}}
                <br>是否突破《规定》第十条要求：
                <span></span>
                {{this.practiceInfo.tenBreak}}
                <br>是否突破《规定》第十六条要求：
                <span></span>
                {{this.practiceInfo.sixteenBreak}}
                <br>工作变动记录（可不填）：
                <span></span>
                {{this.practiceInfo.changed}}
                <br>备注（可不填）：
                <span></span>
                {{this.practiceInfo.remark}}
                <br>
            </div>
            <div class="button">
                <!-- Form -->
                <el-button type="primary" @click="dialogFormVisible = true">填写/修改实习信息</el-button>
                <el-dialog
                    title="实习信息"
                    :visible.sync="dialogFormVisible"
                    :form="practiceInfo">
                    <el-form>
                        <el-form-item label="指导老师：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.teacher_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="指导老师电话：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.teacher_tel" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习公司：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.practice_company" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习岗位：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.post" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习期间：" :label-width="formLabelWidth">
                            <el-col :span="7">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="practiceInfo.date_1"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                                    @change="dateChange_1"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">至</el-col>
                            <el-col :span="7">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="practiceInfo.date_2"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                                    @change="dateChange_2"
                                ></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="实习多久（月）：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.practice_long" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习类型：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.practice_type" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习公司联系人：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.relation_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="实习公司联系人电话：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.relation_tel" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="安排形式：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.arange" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="企业是否录用：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.company_taken" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否突破《规定》第十条要求：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.tenBreak" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否突破《规定》第十六条要求：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.sixteenBreak" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="工作变动记录（可不填）：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.changed" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注（可不填）：" :label-width="formLabelWidth">
                            <el-input v-model="practiceInfo.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updatePractice(practiceInfo)">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // practiceInfo: [],
            dialogFormVisible: false,
            practiceInfo: {
                teacher_name: "",
                teacher_tel: "",
                practice_time: "",
                date_1: "",
                date_2: "",
                practice_type: "",
                practice_long: "",
                practice_company: "",
                relation_name: "",
                relation_tel: "",
                arrange: "",
                post: "",
                company_taken: "",
                tenBreak: "",
                sixteenBreak: "",
                changed: "",
                remark: ""
            },
            formLabelWidth: "120px",
            username: localStorage.getItem("username")
        };
    },
    mounted: function() {
        this.$nextTick(function() {
            this.selectStuPrac();
        });
    },
    methods: {
        //填写实习信息时间
        dateChange_1: function(val) {
            this.practiceInfo.date_1 = val;
        },
        dateChange_2: function(val) {
            this.practiceInfo.date_2 = val;
        },

        //查询实习信息
        selectStuPrac: function() {
            var grade = this.username.substring(0, 4);
            var name = localStorage.getItem("name");
            var params = {
                name: name,
                grade: grade
            };
            this.$http.post(this.$api.selectStuPrac, params).then(res => {
                var date = res.data.result[0].practice_time;
                var date_1 = date.substring(0, date.indexOf("至"));
                var date_2 = date.substring(date.indexOf("至")+1, date.length);
                this.practiceInfo = res.data.result[0];
                this.practiceInfo.date_1 = date_1;
                this.practiceInfo.date_2 = date_2;
                console.log(this.practiceInfo);
            });
        },

        // 填写/修改实习信息
        updatePractice: function(practiceInfo) {
            var grade = this.username.substring(0, 4);
            console.log(practiceInfo);
            var params = {
                name: localStorage.getItem("name"),
                grade: grade,
                teacher_name: practiceInfo.teacher_name,
                teacher_tel: practiceInfo.teacher_tel,
                practice_time: practiceInfo.date_1 + "至" + practiceInfo.date_2,
                practice_type: practiceInfo.practice_type,
                practice_long: practiceInfo.practice_long,
                practice_company: practiceInfo.practice_company,
                relation_name: practiceInfo.relation_name,
                relation_tel: practiceInfo.relation_tel,
                arrange: practiceInfo.arrange,
                post: practiceInfo.post,
                company_taken: practiceInfo.company_taken,
                tenBreak: practiceInfo.tenBreak,
                sixteenBreak: practiceInfo.sixteenBreak,
                changed: practiceInfo.changed,
                remark: practiceInfo.remark
            };
            console.log(params);
            this.$http.post(this.$api.updatePractice, params).then(res => {
                if (res.data.code == 1) {
                    this.$message("提交成功");
                    this.dialogFormVisible = false;
                    console.log(res.data);
                    this.selectStuPrac();
                } else {
                    this.$message("提交失败");
                }
            });
            
        },
       
    }
};
</script>


<style>
/* 学生实习信息表 */
.practice {
    height: 1200px;
    width: 88%;
}
.practice {
    padding: 0 15px;
    height: 100%;
    width: 100%;
}
.connent {
    width: 88%;
    font-size: 16px;
    line-height: 28px;
}
.connent > span {
    display: inline-block;
    width: 20px;
    height: 16px;
}
.button {
    position: absolute;
    right: 72px;
    top: 160px;
}
/* 教师信息卡片 */
.card_item{
    margin: 10px 10px;
}
</style>

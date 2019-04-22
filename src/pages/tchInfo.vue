<template>
    <div class="teacher">

        <!-- 教师用户 -->
        <div>
            <el-row :gutter="24">
                <el-col :span="15">
                    <el-card class="box-card" shadow="hover" v-for="(item, index) in form" :key="index">
                        <div slot="header">
                            <span><strong>{{item.teacher_name}}</strong></span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">修改</el-button>
                        </div>
                        <div class="card_item">编号：{{item.teacher_id}}</div>
                        <div class="card_item">密码：{{item.teacher_pwd}}</div>
                        <div class="card_item">电话：{{item.teacher_tel}}</div>
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog
                    title="教师信息"
                    :visible.sync="dialogFormVisible"
                    v-for="(item, index) in form"
                    :key="index">
                    <el-form>
                        <el-form-item label="姓名：" :label-width="formLabelWidth">
                            <el-input v-model="item.teacher_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="编号：" :label-width="formLabelWidth">
                            <el-input v-model="item.teacher_id" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" :label-width="formLabelWidth">
                            <el-input v-model="item.teacher_pwd" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话：" :label-width="formLabelWidth">
                            <el-input v-model="item.teacher_tel" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateTchInfo(item)">确 定</el-button>
                    </div>
                </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formLabelWidth: "120px",
            username: localStorage.getItem("username"),
            form: [{
                teacher_name: "周天凤",
                teacher_id: "201753060",
                teacher_pwd: "123456",
                teacher_tel: "18576063107"
            }],
            dialogFormVisible: false,
        };
    },
    mounted: function() {
        this.$nextTick(function() {
                this.selectTchInfo();
        });
    },
    methods: {

        // 查看教师信息
        selectTchInfo: function(){
            var params = {
                teacher_name: localStorage.getItem("username")
            };
            this.$http.post(this.$api.selectTchInfo, params).then(res => {
                this.teacherInfo = res.data.result;
            });
        },

        // 修改教师信息
        updateTchInfo:function(item){
            var params = {
                teacher_name: item.teacher_name, 
                teacher_id: item.teacher_id,
                teacher_pwd: item.teacher_pwd,
                teacher_tel: item.teacher_tel
            };
            console.log(params);
            this.$http.post(this.$api.updateTchInfo, params).then(res => {
                this.teacherInfo = res.data.result;
                this.dialogFormVisible = false;
            });
        }
    }
};
</script>


<style>
/* 教师信息卡片 */
.card_item{
    margin: 10px 10px;
}
</style>

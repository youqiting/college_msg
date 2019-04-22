<template>
    <div class="talk">
        <div class="talk_top">
            <div>
                <strong>所有话题</strong>
            </div>
            <div style="position: absolute;right: 20%;">
                <el-button type="primary" size="small" @click="dialogFormVisible = true">发布话题</el-button>
            </div>
        </div>
        <div class="talk_box">
            <el-collapse v-model="activeTalks">
                <el-collapse-item :title="item.talk_title" :name="index" v-for="(item, index) in talkList" :key="index">
                    <div class="talk_conter">{{item.talk_content}}</div>
                    <div class="talk_writer">
                        <div>writer:{{item.talk_writer}}</div>
                        <div>time:{{item.talk_time}}</div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <el-dialog title="发布话题" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="publicTalk()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { parse } from 'path';
export default {
    name: "talk",
    data() {
        return {
            talkList: [],
            activeTalks: ["1"],
            dialogFormVisible: false,
            form: {
                title:'',
                content:''
            },
            formLabelWidth: "120px"
        };
    },
    mounted:function(){
        this.$nextTick(function(){
            this.selectTalk();
        })
    },
    methods: {
        //获取话题
        selectTalk:function(){
            this.$http.post(this.$api.selectTalk).then(res=>{
                console.log(res.data.result);
                this.talkList = res.data.result;
            })
        },

        //发布话题
        publicTalk:function(){
            var params ={
                writer: localStorage.getItem('name'),
                title: this.form.title,
                content:this.form.content
            }
            console.log(params);
            this.$http.post(this.$api.insertTalk, params).then(res=>{
                if(res.data.code == 1){
                    this.$message('发布成功');
                    this.dialogFormVisible = false; 
                }else{
                    this.$message("发布失败");
                }
            })
        }
    }
};
</script>

<style>
.talk {
    width: 80%;
    padding-left: 25px;
    font-family: Arial;
    color: rgba(1, 149, 248, 0.747);
}
.talk_top div {
    display: inline-block;
}
.talk_box {
    width: 100%;
    margin-top: 15px;
    border: 1px solid rgba(1, 149, 248, 0.63);
    box-shadow: 2px 2px 2px rgba(1, 149, 248, 0.295);
}
.el-collapse-item .el-collapse-item__header {
    padding-left: 20px;
    font-weight: 800;
    font-size: 22px;
    color: #f26363b8;
}
.talk_writer > div {
    display: inline-block;
    margin-right: 20px;
}
.talk_writer,
.talk_conter {
    margin: 0 20px;
    height: 40px;
    line-height: 40px;
}
.talk_conter{
    font-size: 18px;
}
.talk_writer{
    font-size: 14px;
    color: #a0a0a0;
}
</style>
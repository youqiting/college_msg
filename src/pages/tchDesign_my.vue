<template>
    <div>
        <el-row class="title">
            <el-col :span="3">年级</el-col>
            <el-col :span="14">课题名称</el-col>
            <el-col :span="7">课题情况</el-col>
        </el-row>
        <el-row class="content" v-for="(item, index) in design" :key="index">
            <el-col :span="3">{{item.grade}}</el-col>
            <el-col :span="14">{{item.design_subject}}</el-col>
            <el-col :span="7" v-html="item.chooseMsg"></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: localStorage.getItem('name'),
            design:[]
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.selectDesignByTch();
        })
    },
    methods:{
        selectDesignByTch:function(){
            var params = {
                name: this.name,
                grade: '2015',
            }
            this.$http.post(this.$api.selectDesignByTch, params).then(res=>{
                console.log(res.data.result);
                res.data.result.forEach((item,index)=>{
                    if(item.chooseMsg != null){
                        item.chooseMsg = item.chooseMsg.replace(/,/g, "<br/>");
                    }
                })
                this.design = res.data.result;
            })
        }
    }
}
</script>

<style>
.title{
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #f674054a;
}
.title > div {
    border-left: 1px  dotted #ddd;
    border-right: 1px  dotted #ddd;
}
.content{
    height: auto;
    margin: 2px 0;
    padding: 1px 0;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    border-bottom: none;
    background-color: #f6c7c761;
}
</style>



<template>
    <div  class="recruit">
        <div class="recruitList">
            <h3 style="color:#62a3f3fa">招聘信息</h3>
            <div class="recruitList">
                <el-collapse v-model="activeNames">
                    <el-collapse-item :title="'岗位：'+item.post" :name="index" v-for="(item, index) in recruitList" :key="index">
                        <div>公  司：  {{item.company}}</div>
                        <div>公司地址： {{item.address}}</div>
                        <div>月薪： {{item.salary}}</div>
                        <div style="width:80%;"><hr/></div>
                        <div>岗位描述：</div>
                        <div class="recruitList_desc"><pre>{{item.postDesc}}</pre></div>
                        <div>要求：</div>
                        <div class="recruitList_desc"><pre>{{item.required}}</pre></div>
                        <div>
                            <el-button type="text" @click="selectRecruitById(item.id)">详细</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="recruitInfo" v-if="this.recruit.id !=null">
           <el-card>
                <div slot="header" class="clearfix">
                    <span>{{this.recruit.post}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard()">关闭</el-button>
                </div>
                <div>公  司：  {{this.recruit.company}}</div>
                <div>公司地址： {{this.recruit.address}}</div>
                <div>月薪： {{this.recruit.salary}}</div>
                <hr/>
                <div class="recruitInfo_desc">岗位描述：
                    <pre>{{this.recruit.postDesc}}</pre>
                </div>
                <div class="recruitInfo_desc">要求：
                    <pre>{{this.recruit.required}}</pre>
                </div>
            </el-card> 
        </div>
    </div>
</template>

<script>
export default {
    name: "recruit",
    data() {
        return {
            activeNames: [],
            recruitList:[],
            recruit:{}
        };
    },
    mounted:function(){
        this.$nextTick(function(){
            this.selectRecruit();
            this.activeNames = ["2"];
        })
    },
    methods:{
        //获取招聘信息
        selectRecruit(){
            this.$http.post(this.$api.selectRecruit).then(res=>{
                this.recruitList = res.data.result;
            })
        },

        // 获取指定id招聘详细信息
        selectRecruitById(id){
            console.log("id:"+id);
            var params ={
                id: id
            }
            this.$http.post(this.$api.selectRecruitById, params).then(res=>{
                this.recruit = res.data.result[0];
            })
        },

        //关闭卡片
        closeCard(){
            this.recruit = {};
        }
    }
};
</script>

<style>
.recruitList{
    width: 70%;
}
.el-collapse-item .el-collapse-item__header{
    font-size: 20px;
}
.el-collapse-item .el-collapse-item__content{
    padding-left: 20px;
    font-size: 16px;
}
.recruitList_desc pre{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.recruitInfo{
    position: absolute;
    top: 170px;
    left: 58%;
    width: 38%;
}
.recruitInfo_desc{
    width: 95%;
    overflow: auto;
}
</style>
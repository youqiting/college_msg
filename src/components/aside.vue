<template>
    <div class="aside_">
        <div class="aside_top">
            <div><img src="../imgs/icon_main.png"/></div>
            <div>
                首页
            </div>
        </div>
        <el-menu 
            default-active="2"
            background-color="rgba(128, 159, 247, 0.61)"
            text-color="#fff"
            >
            <el-submenu index="1">
                <template slot="title" class="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>实习</span>
                </template>
                <el-menu-item index="1-1">
                    <router-link :to="'/practiceInfo'" class="unline">实习信息</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>毕业设计</span>
                </template>
                <el-menu-item index="1-1">
                    <router-link :to="'/myDesign'" class="unline">我的选题</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <router-link :to="'/allDesign'" class="unline">所有题目</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>论坛</span>
                </template>
                <el-menu-item index="1-1">
                    <router-link :to="'/'" class="unline">所有话题</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>招聘</span>
                </template>
                <el-menu-item index="1-1">
                    <router-link :to="'/'" class="unline">招聘列表</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <router-link :to="'/'" class="unline">发布招聘</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>校园新闻</span>
                </template>
                <el-menu-item index="1-1">
                    <router-link :to="'/'" class="unline" >校园风采</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>班级名单</span>
                </template>
                <el-menu-item index="1-1">
                    <router-link :to="'/'" class="unline">花名册</router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    
    </div>
</template>

<script>

export default {
  name: 'aside_',
  
}
</script>

<style>
.aside_{
    margin-top: 60px;
}
.aside_top{
    padding: 10px 22px;
    color: #fff;
    background-color: rgba(128, 159, 247, 0.61);
}
.aside_top  div{
    padding-right: 15px;
}
.aside_top > div{
    display: inline-block;
}
.el-submenu__title span{
    padding-left: 10px;
}
.el-menu-item a{
    display: block;
    padding-left: 20px;
}
.title{
    font-weight :bold;
}
.unline{
    text-decoration: none;
    color: rgb(255, 247, 134);
}
</style>
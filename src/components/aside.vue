<template>
    <div class="aside_">
        <!-- 学生 menu -->
        <el-menu 
            :unique-opened="true"
            :default-active="this.$router.path"
            background-color="rgba(128, 159, 247)"
            text-color="#fff"
            v-if="this.usertype == 'student'"
            router>
            <el-menu-item index="/main">
                <img src="../imgs/icon_main.png"/>
                <span>首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title" class="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>实习</span>
                </template>
                <el-menu-item index="/stuPracticeInfo">
                    <span class="item_title">实习信息</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>毕业设计</span>
                </template>
                <el-menu-item index="/stuDesign_stu">
                    <span class="item_title">我的选题</span>
                </el-menu-item>
                <el-menu-item index="/stuDesign_all">
                    <span class="item_title">所有题目</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>论坛</span>
                </template>
                <el-menu-item index="/talk">
                    <span class="item_title">所有话题</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/recruit">
                <img src="../imgs/icon_man.png"/>
                <span slot="title">查看招聘信息</span>
            </el-menu-item>
            <el-submenu index="5">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>校园新闻</span>
                </template>
                <el-menu-item index="/news">
                    <span class="item_title" >校园风采</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>班级名单</span>
                </template>
                <el-menu-item index="/stuClassForm">
                    <span class="item_title">花名册</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>

        <!-- 教师 menu -->
        <el-menu 
            :unique-opened="true"
            :default-active="this.$router.path"
            background-color="rgba(128, 159, 247)"
            text-color="#fff"
            v-if="this.usertype == 'teacher'"
            router>
            <el-menu-item index="/main">
                <img src="../imgs/icon_main.png"/>
                <span>首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title" class="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>信息</span>
                </template>
                <el-menu-item index="/tchInfo">
                    <span class="item_title">个人信息</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>毕业设计</span>
                </template>
                <el-menu-item index="/tchDesign_stu">
                    <span class="item_title">学生选题</span>
                </el-menu-item>
                <el-menu-item index="/tchDesign_my">
                    <span class="item_title">我的题目</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>论坛</span>
                </template>
                <el-menu-item index="/talk">
                    <span class="item_title">所有话题</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>招聘消息</span>
                </template>
                <el-menu-item index="/recruit">
                    <span class="item_title">查看招聘信息</span>
                </el-menu-item>
                <el-menu-item index="/recruit_public">
                    <span class="item_title">发布招聘</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>校园新闻</span>
                </template>
                <el-menu-item index="/news">
                    <span class="item_title" >校园风采</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <img src="../imgs/icon_man.png"/>
                    <span>班级名单</span>
                </template>
                <el-menu-item index="/tchClassForm">
                    <span class="item_title">花名册</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>

export default {
  name: 'aside_',
  data(){
      return{
          usertype: localStorage.getItem('usertype')
      }
  }
}
</script>

<style>
.aside_ , .el-menu{
    height: 100%;
}
.el-submenu__title span{
    padding-left: 10px;
}
.el-menu-item span{
    padding-left: 10px;
}
.el-menu-item .item_title{
    padding-left: 20px;
    color: aqua;
}
.el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #f5dd029f;
}
</style>
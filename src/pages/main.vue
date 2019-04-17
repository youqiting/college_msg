<template>
    <div id="main">
        <el-container>
            <el-aside width="200px">
                <Aside/>
            </el-aside>

            <el-container>
                <el-header>
                    <Header/>
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>

                <el-footer>
                    <Footer/>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from "../components/aside.vue";
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";

export default {
    name: "app",
    components: {
        Aside,
        Header,
        Footer
    },
};
</script>

<style>
.el-aside {
    height: 100vh;
    text-align: left;
}
.el-main {
    width: 100%;
    height: auto;
    margin-bottom: 50px;
}
</style>

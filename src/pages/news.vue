<template>
    <div class="news">
        <h3>校园风采</h3>
        <div class="news_box">
            <div class="news_title" v-for="(item, index) in newsList" :key="index">
                <a :href="item.href">{{item.title}}</a>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "news",
    data() {
        return {
            activeNames: "",
            newsList: [
                {
                    href: "http://www.zspt.cn/info/1062/15364.htm",
                    title: "学校2018级精英100学生骨干培养开班典礼暨第一讲开课"
                },
                {
                    href: "http://www.zspt.cn/info/1062/15361.htm",
                    title: "喜报！省职业院校学生专业技能大赛勇夺13个一等奖"
                },
                {
                    href: "http://www.zspt.cn/info/1062/15355.htm",
                    title: "学校召开党委中心组专题学习会"
                }
            ]
        };
    }
};
</script>

<style>
.news {
    padding-left: 25px;
    font-family: Arial;
    color: rgba(1, 149, 248, 0.747);
}
.news_box {
    width: 80%;
    border: 1px solid rgba(1, 149, 248, 0.63);
    box-shadow: 2px 2px 2px rgba(1, 149, 248, 0.295);
}
.news_title {
    margin: 20px 20px;
}
.news_title a {
    font-size: 20px;
    color: rgb(0, 47, 255);
    text-decoration: none;
}
</style>
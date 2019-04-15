<template>
  <div>
      <div class="user">
        <el-button type="text">
          {{name}}
        </el-button>
        <el-button type="primary" size="mini" @click="quit() ">
          退出
        </el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'header_',
  data(){
    return{
      name:'',
      hasLogin:localStorage.getItem('hasLogin')
    }
  },
   mounted:function(){
    this.$nextTick(function(){
      this.getUserName();
    })
  },
  methods:{
    getUserName:function(){
      this.name = localStorage.getItem('name');
      console.log(this.name)
    },
    // 登录
    login:function(){
      this.$router.push('/user_login');
    },
    //退出
    quit:function(){
      localStorage.removeItem('name'); 
      localStorage.removeItem('username'); 
      localStorage.removeItem('hasLogin');
      this.$router.push('/login');
    }
    
  },
}
</script>

<style>
.el-header{
    padding:10px 10px;
    margin: 10px 20px 10px 10px;
    text-align: right;
}
.user{
  width: 150px;
  margin-right: 50px;
  position: absolute;
  right: 2%;
}
</style>
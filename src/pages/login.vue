<template>
  <div id="login">
    <div class="loginForm">

      <el-form :model="form" label-width="50px;" ref="form" :rules="rules">
        <el-form-item label="name:" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="password:" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="who are you:" prop="type">
          <template>
            <el-radio v-model="form.type" label="tch">teacher</el-radio>
            <el-radio v-model="form.type" label="stu">student</el-radio>
          </template>
        </el-form-item>
        <el-form-item>
            <el-button class="register_btn" type="text" @click="register()" round>
                <small>还没有账号-> </small> 注册
                <i class="el-icon-circle-plus-outline" ></i>
            </el-button>
            <el-button class="login_btn" type='primary' @click="login()">
            登录
            </el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return{
      form:{
          name:"",
          password:"",
          type:"stu"
      },
      rules:{
          name:[{required:true, message:'请输入用户名'}],
          password:[{required:true, message:'请输入密码'}],
      },
    }
  },
  //  如果已经登录过，就直接跳过登录页面
  created: function(){
         var hasLogin = localStorage.getItem('hasLogin')
         console.log('hasLogin:'+hasLogin);
         if(hasLogin=='1'){
              this.$router.push('/main')
         }
  },
  methods:{
    //登录
    login:function(){
      var params ={
        name: this.form.name,
        password: this.form.password,
        type: this.form.type
      }
      this.$http.post(this.$api.login, params).then(res=>{
        console.log(res.data);
        var result = res.data;
        if(result.state =="null"){
          this.$message.error('用户名不存在...');
        }else if(result.state =="fail"){
          this.$message.error('密码错误...');
        }else if(result.state =="success"){
          this.$message.success('登陆成功..');
          var name = "";
          if(result.msg == "teacher"){
            name =  result.data[0].teacher_name ;
          }else if(result.msg == "student"){
            name =  result.data[0].student_name ;
          }
          console.log("result:"+result.data[0]);
          localStorage.setItem('username', params.name);
          localStorage.setItem('name', name);
          localStorage.setItem('type', result.data[0].type);
          localStorage.setItem('hasLogin', '1')
          this.$router.push('/main');
        }
      })
    }
  }
}
</script>

<style>
#login{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background: #fff;
  background-image: url('../imgs/中职正门.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}
.loginForm{
  width: 400px;
  margin: 50px auto;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.623);
  box-shadow:5px 5px 5px rgba(221, 221, 221, 0.637);
  text-align: center;
}
.register_btn {
  position: absolute;
  right: 0;
}
.register_btn > span{
  color: rgba(48, 19, 216, 0.521);
}
</style>

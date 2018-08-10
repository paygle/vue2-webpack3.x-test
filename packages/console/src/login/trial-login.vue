<template>
  <div class="trial-form-wrapper">
    <div class="login-form">
      <div class="lg-frm-header">
        <h3 class="title">免费申请试用帮你教专业琴行&学校管理系统</h3>
      </div>
      <div class="form-wrapper" v-show="!swichCode" >
        <el-form :model="lgform" status-icon :rules="lgrules" ref="lgform" inline-message>
          <el-form-item prop="phone">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.phone" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.age" placeholder="验证码">
              <template slot="append">
                <img class="valid-code" @click="changeValidcode" :src="validimgurl">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="pcode">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.pcode" placeholder="输入短信验证码">
              <template slot="append">
                <el-button>获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input prefix-icon="el-icon-edit" v-model.number="lgform.code" placeholder="机构编码"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.name" placeholder="用户名"></el-input>
          </el-form-item>
        </el-form>
        <div class="submit-btn">
          <el-button type="primary" @click="submitForm('lgform')">免费试用</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {addClass} from '@utils/dom';
import emitter from '@mixins/emitter';
export default {
  name: 'TrialLogin',
  componentName: 'TrialLogin',
  mixins: [emitter],
  data() {

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.lgform.checkPass !== '') {
          this.$refs.lgform.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.lgform.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      swichCode: false,  // rcode 切换
      isForget: false,   // 是否忘记密码
      validimgurl: '/static/img/logo.png',   // 验证码地址
      lgform: {
        code: '',
        name: '',
        pass: '',
        vcode: ''
      },
      lgrules: {
        code: [
          { validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },

  methods: {

    // 切换验证码
    changeValidcode() {
      this.validimgurl = '';
    },
    // 提交登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.dispatch('Login', 'update-title', '申请试用');
      addClass(document.querySelector('.login-wrapper'), 'login-trial');
    });
  }
};
</script>

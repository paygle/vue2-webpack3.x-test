<template>
  <div class="client-form-wrapper">
    <div class="login-form">
      <div class="lg-frm-header">
        <h3 class="title" v-text="formTitle"></h3>
        <span v-if="!isForget" class="chg-rcode" @click="swichrcodeClick">切</span>
        <span v-if="isForget" class="go-login" @click="backLoginClick">
          <i class="el-icon-arrow-left"></i>返回登录
        </span>
      </div>
      <div class="form-wrapper" v-show="!swichCode" >
        <el-form :model="lgform" status-icon :rules="lgrules" ref="lgform" inline-message>
          <el-form-item prop="code">
            <el-input prefix-icon="el-icon-edit" v-model.number="lgform.code" placeholder="机构编码"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item v-if="!isForget" prop="pass">
            <el-input prefix-icon="el-icon-edit" type="password" v-model="lgform.pass" placeholder="密码">
              <template slot="append">
                <span class="look el-icon-view"></span>
                <span class="forget" @click="forgetClick">忘记密码</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="!isForget" prop="vcode">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.age" placeholder="验证码">
              <template slot="append">
                <img class="valid-code" @click="changeValidcode" :src="validimgurl">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="isForget" prop="phone">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.phone" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item v-if="isForget" prop="pcode">
            <el-input prefix-icon="el-icon-edit" v-model="lgform.pcode" placeholder="输入短信验证码">
              <template slot="append">
                <el-button>获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="submit-btn">
          <el-button type="primary" @click="submitForm('lgform')">提交</el-button>
        </div>
      </div>
      <div v-show="swichCode" class="rcode-page">
        <div class="rcode-scan"></div>
        <div class="txt">打开<em> 帮你教 机构版 APP</em>扫一扫登录</div>
      </div>
    </div>
    <div class="rcode-pop"><div class="rcode-dwapp"></div></div>
    <div class="others">
      <span class="download">下载帮你教机构APP</span><em>|</em>
      <router-link to="/lg/trial">免费申请试用</router-link><em>|</em>
      <a href="#">仍有疑问？</a>
      <router-link to="/home">HOME</router-link><em>|</em>
    </div>
  </div>
</template>
<script>
import {removeClass} from '@utils/dom';
import emitter from '@mixins/emitter';

export default {
  name: 'ClientLogin',
  componentName: 'ClientLogin',
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
      formTitle: '密码登录',
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

  watch: {
    isForget(n) {
      if (n) {

      } else {
        this.swichCode = false;
      }
    }
  },

  methods: {
    // 切换二维码
    swichrcodeClick() {
      this.swichCode = !this.swichCode;
      if (this.swichCode) {
        this.formTitle = '扫码登录';
      } else {
        this.formTitle = '密码登录';
      }
    },
    // 返回登录
    backLoginClick() {
      this.swichCode = false;
      this.isForget = false;
    },
    forgetClick() {
      this.isForget = true;
      this.formTitle = '扫码登录';
    },
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
      this.dispatch('Login', 'update-title', '机构登录');
      removeClass(document.querySelector('.login-wrapper'), 'login-trial');
    });
  }
};
</script>

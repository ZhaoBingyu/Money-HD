import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonUrlService} from './common-url.service';
import {Subject} from 'rxjs';
import * as util from './common/util';
import * as loginManage from './common/loginManage';
import {ajaxAsyncSubmit, ajaxSubmit} from './common/util';
import * as provinceCityData from './common/provinceCityData';
import {ajaxSuccess} from './common/util';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public url: CommonUrlService, public http: HttpClient) {
  }

  /** 订阅路由跳转 **/
  private routerJump = new Subject();

  setRouterJump(data) {
    this.routerJump.next(data);
  }

  getRouterJump() {
    return this.routerJump.asObservable();
  }

  /** 订阅模态框 **/
  private showModel = new Subject();

  setShowModel(data) {
    this.showModel.next(data);
  }

  getShowModel() {
    return this.showModel.asObservable();
  }


  // 异步ajax submit 提取公共部分
  asyncAjaxSubmit(sendUrl, sendData) {
    const curTime = this.getCurTime();
    const randomNum = this.getSeqNo();
    const requestData = {
      'request_head': {
        'version': '1.0',
        'request_seq_no': randomNum,
        'cust_no': '000000',
        'cust_chnl': '0000',
        'request_date': `${curTime.Year}${curTime.Month}${curTime.Day}`,
        'request_time': `${curTime.Hour}${curTime.Minute}${curTime.Second}`,
        'oper': '',
        'oper_sign': '',
        'tran_code': '',
        'auth_oper': '',
        'extend_data': ''
      },
      'request_body': sendData
    };
    return this.http.post(sendUrl, requestData);
  }


  /** 查询 理财产品列表查询 查询提供给客户的理财产品列表基本信息 **/
  yql_fundQueryProductListInfo(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundQueryProductListInfo.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 查询 理财产品详细信息查询 查询提供给客户的理财产品的详细信息 **/
  yql_fundQueryProductInfo(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundQueryProductInfo.do';
    return ajaxSubmit(sendUrl, sendData);
  }


  /** 注册 注册手机短信 **/
  yql_fundSendMessage(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundSendMessage.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 注册 注册手机短信验证 **/
  yy_sendMessageValidate(sendData) {
    const sendUrl = this.url.commonUrl + 'yy_sendMessageValidate.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 注册 注册图片上传 **/
  yql_registerCustomerInfoImg(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_registerCustomerInfoImg.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 注册 注册企业对公开户行信息 **/
  yql_fundRegisterCustomerBankInfo(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundRegisterCustomerBankInfo.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 注册 注册省市区 **/
  yql_fundRegisterCustomerProvinceCity(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundRegisterCustomerProvinceCity.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 注册 注册信息 **/
  yql_fundRegisterCustomerInfo(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundRegisterCustomerInfo.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 登录**/
  yql_fundPlatformLogin(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundPlatformLogin.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 登录密码重置 注册手机短信  忘记密码需要发送短信验证码**/
  yql_fundSendMessageFindPwd(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundSendMessage.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 登录密码重置 图片验证码  忘记密码需要获取图片验证码**/
  yql_fundVerifyCode(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundVerifyCode.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 登录密码重置 重置登入密码  重置登入密码**/
  yql_fundForgotLoginPassword(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundForgotLoginPassword.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 登录密码重置 修改登入密码  修改登入密码**/
  api_fundChangeLoginPassword(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundChangeLoginPassword.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 支付密码重置 修改支付密码  修改支付密码**/
  api_fundChangePayPassword(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundChangePayPassword.do';
    return ajaxSubmit(sendUrl, sendData);
  }


  /** 开户 企业对公账户信息添加**/
  yql_fundADDCompanyAccount(sendData) {
    const sendUrl = this.url.commonUrl + 'yql_fundADDCompanyAccount.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 开户 企业基本信息  企业基本信息【ICBC开户,上海银行，江苏银行】**/
  api_fundCompanyInfo(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundCompanyInfo.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 开户 企业对公账户基本信息  结算账户帐号 企业对公账户基本信息【ICBC开户,上海银行，江苏银行】**/
  api_fundCompanyAccount(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundCompanyAccount.do';
    // return ajaxSubmit(sendUrl, sendData);
  }

  /** 开户 企业开户行业字典表  企业开户行业【ICBC开户,上海银行，江苏银行】**/
  api_fundOpenIndustryInfo(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundOpenIndustryInfo.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 开户 企业开户发送短信  企业开户发送短信【ICBC开户,上海银行，江苏银行】**/
  api_fundOpenSendMessage(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundOpenSendMessage.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 开户 企业开户  企业开户【ICBC开户,上海银行，江苏银行】**/
  api_fundAccountOpen(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundAccountOpen.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 开户 企业理财开户信息查询列表  企业开户【ICBC开户,上海银行，江苏银行】**/
  api_fundCompanyBankList(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundCompanyBankList.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 开户 企业开户结果查询  企业开户结果查询**/
  api_companyBankResult(sendData) {
    const sendUrl = this.url.commonUrl + 'api_companyBankResult.do';
    return ajaxSubmit(sendUrl, sendData);
  }


  /** 申购  申购短信验证码  根据产品需要发送对用银行的短信验证码**/
  api_fundBuySendMessage(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundBuySendMessage.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 申购  申购  申购**/
  api_fundBuyProduct(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundBuyProduct.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 赎回    赎回短信验证码    根据产品需要发送对用银行的短信验证码  **/
  api_fundVolSendMessage(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundVolSendMessage.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 赎回    赎回份额  赎回  **/
  api_fundVolProduct(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundVolProduct.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 提现    提现短信验证码    根据产品需要发送对用银行的短信验证码**/
  api_fundCashSendMessage(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundCashSendMessage.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 提现    提现    提现**/
  api_fundCashProduct(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundCashProduct.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 理财    理财产品持仓查询 赎回 可赎回份额  查询  查看详情 客户购买理财产品的持仓信息。**/
  api_fundHoldProduct(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundHoldProduct.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 理财    转出 可转出余额  电子账户余额查询  查询客户电子账户余额信息**/
  api_fundAccountProduct(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundAccountProduct.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 申购记录  申购记录查询【分页】**/
  api_fundBuyProductList(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundBuyProductList.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 赎回记录  赎回记录查询【分页】**/
  api_fundVolProductList(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundVolProductList.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 提现记录  提现记录查询【分页】**/
  api_fundCashProductList(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundCashProductList.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 收益明细  收益记录查询【分页】**/
  api_fundProfitProductList(sendData) {
    const sendUrl = this.url.commonUrl + 'api_fundProfitProductList.do';
    return ajaxSubmit(sendUrl, sendData);
  }

  /** 登录管理 **/
  validateLogin = loginManage.validateLogin;  //  登录验证


  /** util **/
  reqPhone = util.reqPhone; // 手机号校验规则
  onDateChange = util.onDateChange; //  日期格式化 (日期转字符串)YYYYDDMM
  onDateFormatChange = util.onDateFormatChange; //日期格式化 (日期转字符串)YYYY-DD-  MM
  onStrToDateChange = util.onStrToDateChange; //  获取日期 (字符串转日期)
  queryEnumList = util.queryEnumList; // 码表查询
  writeLoginInfo = util.writeLoginInfo; // cookie 保存登录信息
  getLoginInfo = util.getLoginInfo; // cookie 获取登录信息
  getUrlParameter = util.getUrlParameter; // 获取url参数
  getCurTime = util.getCurTime; // 获取当前时间
  getSeqNo = util.getSeqNo; // 获取32位随机数
  /** 省市联动数据 **/
  provinceCityData = provinceCityData.options;

}



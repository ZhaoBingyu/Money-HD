import {ajaxSubmit} from './util';

/** 登录 **/
function login(obj) {
  const sendUrl = this.url.commonUrl + '/ajaxLogin';
  const sendData = obj;
  return ajaxSubmit(sendUrl, sendData);
}

/** 退出 **/
function signOut() {
  const sendUrl = this.url.commonUrl + '/signOut';
  const sendData = {};
  return ajaxSubmit(sendUrl, sendData);
}

/** 登录验证 **/
function validateLogin(token?): any {
  const sendUrl = this.url.commonUrl + 'api_fundCompanyAccount.do';

  const sendData: any = {
    'Accept-Authentication': sessionStorage.getItem('sessionToken') || token
  };

  const resData = ajaxSubmit(sendUrl, sendData);
  if (resData.response_head.service_resp_desc === '该企业客户未登入或者登入已失效,请重新登入！！') {
    return false;
  } else {
    return true;
  }

}

/** 获取侧边菜单 **/
function getSideMenu() {
  let resultData: any;
  resultData = sessionStorage.getItem('menuTree');
  return resultData;
}

export {login, signOut, validateLogin, getSideMenu};

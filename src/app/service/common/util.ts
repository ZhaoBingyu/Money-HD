import * as $ from 'jquery';
import {Router} from '@angular/router';
import {CommonService} from '../common.service';

// 写cookies
function setCookie(name, value, time) {
  // const exp = new Date();
  // exp.setTime(exp.getTime() + time * 60 * 1000 * 60 * 24); // 设置cookie过期时间 天
  // exp.setTime(exp.getTime() + time * 60 * 1000); // 设置cookie过期时间 分钟
  document.cookie = name + '=' + escape(value) + ';expires=' + time;
}

// 读取cookies
function getCookie(name) {
  let arr: any = [];
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

// 删除cookies
function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
  }
}

// 记录登录信息 有效期1天 cookie
function writeLoginInfo(data, time) {
  const curDate = new Date();
  const curTamp = curDate.getTime(); // 当前时间戳
  // 当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
  const curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
  // 当日已经过去的时间（毫秒）
  const passedTamp = curTamp - curWeeHours;
  // 当日剩余时间
  const leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
  const leftTime = new Date();
  leftTime.setTime(leftTamp + curTamp);
  leftTime.toUTCString();
  setCookie(data.name, data.value, leftTime);
}

// 获取登录信息 有效期1天 cookie
function getLoginInfo(data) {
  return getCookie(data);
}

// 手机号校验规则
function reqPhone(value) {
  const phone = value;
  const length = String(phone).length;
  const phoneReg = /^1[1|2|3|4|5|6|7|8|9|0][0-9]\d{4,8}$/;
  return length === 11 && phoneReg.test(phone);
}

//  日期格式化 (日期转字符串)YYYYMMDD
function onDateChange(result: Date) {
  try {
    const Year = result.getFullYear();
    const Month = result.getMonth() + 1 < 10 ? '0' + (result.getMonth() + 1) : result.getMonth() + 1;
    const Date = result.getDate() < 10 ? '0' + result.getDate() : result.getDate();
    const formatDate = `${Year}${Month}${Date}`;
    return formatDate;
  } catch (e) {
    // console.log(e);
  }
}

//  日期格式化 (日期转字符串)YYYY-MM-DD
function onDateFormatChange(result: Date) {
  try {
    const Year = result.getFullYear();
    const Month = result.getMonth() + 1 < 10 ? '0' + (result.getMonth() + 1) : result.getMonth() + 1;
    const Date = result.getDate() < 10 ? '0' + result.getDate() : result.getDate();
    const formatDate = `${Year}-${Month}-${Date}`;
    return formatDate;
  } catch (e) {
    // console.log(e);
  }
}

//  获取日期 (字符串转日期)
function onStrToDateChange(result) {
  try {
    const Year = result.slice(0, 4);
    const Month = parseInt(result.slice(4, 6)) - 1;
    const Day = parseInt(result.slice(6));
    return new Date(Year, Month, Day);
  } catch (e) {
    // console.log(e);
  }
}

//  码表查询
function queryEnumList(enumType) {
  const sendData = {
    enumType: enumType,
    enumName: null,
    enumParentName: null,
    status: null,
  };
  try {
    const dataList = JSON.parse(this.selectEnumList(sendData).dataList[0]);
    return dataList;
  } catch (e) {
    console.log(e);
  }
}

// 文件下载
function downloadFile(sendUrl, sendData) {
  const myDate = new Date();
  const myTime = myDate.getTime();
  const year = myDate.getFullYear().toString();
  const month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
  const day = (myDate.getDate()) < 10 ? '0' + (myDate.getDate()) : myDate.getDate();
  const hours = (myDate.getHours()) < 10 ? '0' + (myDate.getHours()) : myDate.getHours();
  const minutes = (myDate.getMinutes()) < 10 ? '0' + (myDate.getMinutes()) : myDate.getMinutes();
  const seconds = (myDate.getSeconds()) < 10 ? '0' + (myDate.getSeconds()) : myDate.getSeconds();
  const name = year + month + day + hours + minutes + seconds;
  const req = new XMLHttpRequest();
  req.open('POST', sendUrl, true);
  req.responseType = 'blob';
  req.setRequestHeader('Content-Type', 'application/json');
  req.setRequestHeader('token', sessionStorage.getItem('token'));
  try {
    req.onload = function () {
      const data = req.response;
      const a = document.createElement('a');
      const blob = new Blob([data]);
      const blobUrl = window.URL.createObjectURL(blob);
      const _a = document.createElement('a');
      _a.style.display = 'none';
      _a.download = `${name}.xls`;
      _a.href = blobUrl;
      _a.click();
      try {
        document.body.removeChild(_a);
      } catch (e) {
      }
    };
  } catch (e) {
    console.log(e);
  }
  req.send(JSON.stringify(sendData));
}


function downloadFileGet(sendUrl, sendData) {
  const myDate = new Date();
  const myTime = myDate.getTime();
  const year = myDate.getFullYear().toString();
  const month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
  const day = (myDate.getDate()) < 10 ? '0' + (myDate.getDate()) : myDate.getDate();
  const hours = (myDate.getHours()) < 10 ? '0' + (myDate.getHours()) : myDate.getHours();
  const minutes = (myDate.getMinutes()) < 10 ? '0' + (myDate.getMinutes()) : myDate.getMinutes();
  const seconds = (myDate.getSeconds()) < 10 ? '0' + (myDate.getSeconds()) : myDate.getSeconds();
  const name = year + month + day + hours + minutes + seconds;
  const req = new XMLHttpRequest();
  req.open('GET', sendUrl, true);
  req.responseType = 'blob';
  req.setRequestHeader('Content-Type', 'application/json');
  req.setRequestHeader('token', sessionStorage.getItem('token'));
  try {
    req.onload = function () {
      const data = req.response;
      const a = document.createElement('a');
      const blob = new Blob([data]);
      const blobUrl = window.URL.createObjectURL(blob);
      const _a = document.createElement('a');
      _a.style.display = 'none';
      _a.download = `${name}.xls`;
      _a.href = blobUrl;
      _a.click();
      try {
        document.body.removeChild(_a);
      } catch (e) {
      }
    };
  } catch (e) {
    console.log(e);
  }
  req.send(JSON.stringify(sendData));
}

// ajax 请求函数
function ajaxSubmit(sendUrl, sendData) {
  let resultData: any;
  const curTime = getCurTime();
  const randomNum = getSeqNo();
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

  // const header = {
  //   'Accept-Authentication': '95fee85dd61949698898b2ffca480eb3',
  //   'User-Agent-Channel-No': sessionStorage.getItem('channel'),
  //   'User-Agent-Merch-User-No': sessionStorage.getItem('merchUserId')
  // };

  const header = {
    'Accept-Authentication': sessionStorage.getItem('sessionToken'), // 登录sessionToken
  };

  $.ajax({
    async: false,
    type: 'post',
    // headers: header,
    contentType: 'application/json',
    // contentType: 'application/json;charset=UTF-8',
    url: sendUrl,
    data: JSON.stringify(requestData),
    dataType: 'json',
    success: function (data) {
      resultData = ajaxSuccess(data);
    },
    error: function (error) {
      // ajaxError(error, sendUrl);
    }
  });
  return resultData;
}

// async ajax  请求函数
function ajaxAsyncSubmit(sendUrl, sendData, successFun) {
  let resultData: any;
  const curTime = getCurTime();
  const randomNum = getSeqNo();
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

  // const header = {
  //   'Accept-Authentication': '95fee85dd61949698898b2ffca480eb3',
  //   'User-Agent-Channel-No': sessionStorage.getItem('channel'),
  //   'User-Agent-Merch-User-No': sessionStorage.getItem('merchUserId')
  // };

  $.ajax({
    async: true,
    type: 'post',
    // headers: header,
    contentType: 'application/json',
    // contentType: 'application/json;charset=UTF-8',
    url: sendUrl,
    data: JSON.stringify(requestData),
    dataType: 'json',
    success: function (data) {
      successFun(data);
      resultData = ajaxSuccess(data);
      console.log(data);
      console.log(resultData);
    },
    error: function (error) {
      // ajaxError(error, sendUrl);
    }
  });
  console.log(resultData);
  return resultData;
}

// ajax success执行函数
function ajaxSuccess(data) {
  const response_head = data.response_head;
  const response_body = data.response_body;
  // if (data.code === '1001') {
  //   const url = window.location.href;
  //   const index = url.indexOf('#');
  //   const host = url.slice(0, index);
  //   window.location.href = host;
  // }
  return data;

}

// ajax error执行函数
function ajaxError(error, sendUrl) {
  const url = window.location.href;
  const index = url.indexOf('#');
  const host = url.slice(0, index);
  window.location.href = host;
  // window.location.href = host + '#/login';
  console.log(`error ${sendUrl}：`, error);
}

// 获取32位 唯一流水号
function getSeqNo() {
  let cur: any = new Date();
  cur = cur.getTime().toString();
  cur = cur.slice(0, 10);
  let random1: any = Math.random() * 10000000000;
  random1 = parseInt(random1);
  random1 = random1.toString();
  let random2: any = Math.random() * 1000000000000;
  random2 = parseInt(random2);
  random2 = random2.toString();
  return cur + random1 + random2;
}

// 获取当前时间
function getCurTime() {
  const cur = new Date();
  const Year = cur.getFullYear();
  const Month = cur.getMonth() + 1 < 10 ? '0' + (cur.getMonth() + 1) : (cur.getMonth() + 1);
  const Day = cur.getDate() < 10 ? '0' + cur.getDate() : cur.getDate();
  const Hour = cur.getHours() < 10 ? '0' + cur.getHours() : cur.getHours();
  const Minute = cur.getMinutes() < 10 ? '0' + cur.getMinutes() : cur.getMinutes();
  const Second = cur.getSeconds() < 10 ? '0' + cur.getSeconds() : cur.getSeconds();
  return {
    Year: Year,
    Month: Month,
    Day: Day,
    Hour: Hour,
    Minute: Minute,
    Second: Second
  };
}

function getUrlParameter(data) {
  const urlParmStr = location.hash.slice(location.hash.lastIndexOf('?') + 1);
  const urlParamArr = urlParmStr.split('&');
  const urlParamObjArr: any = [];
  for (let i = 0; i < urlParamArr.length; i++) {
    const urlParamTemp = urlParamArr[i].split('=');
    const urlParamObj = {
      name: urlParamTemp[0],
      value: urlParamTemp[1]
    };
    urlParamObjArr.push(urlParamObj);
  }
  for (let i = 0; i < urlParamObjArr.length; i++) {
    if (urlParamObjArr[i].name === data) {
      return urlParamObjArr[i].value;
    }
  }
}


export {

  reqPhone,
  onDateChange,
  onStrToDateChange,
  queryEnumList,
  downloadFile,
  downloadFileGet,
  ajaxSubmit,
  ajaxAsyncSubmit,
  ajaxSuccess,
  ajaxError,
  writeLoginInfo,
  getLoginInfo,
  getUrlParameter,
  getCurTime,
  getSeqNo,
  onDateFormatChange
};



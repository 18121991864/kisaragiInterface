/* eslint-disable import/prefer-default-export */
import i18n from 'i18next';

export const interceptAdd = (add) => {
  const l = 4;
  return add
    ? `${add.substr(0, l)
    }...${add.substring(add.length - l)}`
    : 'Connect Wallet';
};

function IsPC() {
 
  const userAgentInfo = navigator.userAgent;
   
  const Agents = ["Android", "iPhone",
   
  "SymbianOS", "Windows Phone",
   
  "iPad", "iPod"];
   
  let flagPc = true;
   
  for (let v = 0; v < Agents.length; v++) {
   
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flagPc = false;
      
      break;
    
    }
   
  }
   
  return flagPc;
   
  }
   
   
   
  export const flagZt = IsPC();
   
  // console.log(flag) //true为PC端，false为手机端

  // 倒计时时间转换
export const formatDateWithSlash = (time) => {
  if (time > 0) {
    // 天为 / 24
    let d = parseInt((time / 60 / 60 / 24).toString()) as any;
    if (d >= 0) {
      d = d < 10 ? `0${d}` : d;
    } else {
      d = '00';
    }
    let h = parseInt((time / 60 / 60 % 24).toString()) as any;
    if (h >= 0) {
      h = h < 10 ? `0${h}` : h;
    } else {
      h = '00';
    }
    let m = parseInt((time / 60 % 60).toString()) as any;
    if (m >= 0) {
      m = m < 10 ? `0${m}` : m;
    } else {
      m = '00';
    }
    let s = parseInt((time % 60).toString()) as any;
    if (s >= 0) {
      s = s < 10 ? `0${s}` : s;
    } else {
      s = '00';
    }
    return {
      d,
      h,
      m,
      s
    };
  }
  return {
    d: '00',
    h: '00',
    m: '00',
    s: '00'
  };
};

export function initLangage() {
  // let lang = localStorage.getItem("language") || navigator.language // 获取浏览器的语言环境，兼容IE的写法
  let lang = localStorage.getItem("language") || "en"
  if (lang) {
    lang = lang.substr(0, 2).toLowerCase() // 截取前两位字符，并转化为小写
    return lang
  } 
    return "en"
}

export function changeLanguage(val) {
	i18n.changeLanguage(val); // val入参值为'en'或'zh'
}
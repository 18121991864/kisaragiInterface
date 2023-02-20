import BigNumber from "bignumber.js";

export const  accAdd = (arg1,arg2) => { 
    let r1; let r2;   
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
    // eslint-disable-next-line no-restricted-properties
    const m=Math.pow(10,Math.max(r1,r2)) 
    return (arg1*m+arg2*m)/m 
} 
 
export const accMinus = (arg1,arg2) => { 
    let  r1; let r2;  
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
    // eslint-disable-next-line no-restricted-properties
        const m=Math.pow(10,Math.max(r1,r2)); 
        const n=(r1>=r2)?r1:r2; 
    return ((arg1*m-arg2*m)/m).toFixed(n); 
}

export const  formatDecimal = (num1, decimal = 4) => {
  // eslint-disable-next-line no-param-reassign
  let num = num1.toString()
  const index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num) 
}

export const validateInput = (number: string) => {
    return /^[0-9]*[1-9][0-9]*$/.test(number) || number === '';
}

export const validateInputExceptZero = (number: string) => {
    return /^[0-9]*[0-9][0-9]*$/.test(number) || number === '';
}

export const validateFloat = (val: string) => {
      return /^[0-9]+\.?[0-9]*$/.test(val) || val === '';
}

export const formatThousand = (num) => { 
  const str = num.toString();
  const leg = str.length;
  const arr = str.split('');
  if(leg <= 3) return str;
  for (let i = leg - 3; i > 0; i-=3) {
    arr.splice(i, 0, ',')
  }
  return arr.join('');
}

export const  formatNumber= function(number) {
  let num = number;
  if (number instanceof BigNumber) {
    num = number.toNumber();
  } 
  if ( typeof number === 'string') {
    num = Number(num)
  }
  if (num === 0) {
    return num.toFixed(4)
  } 
  return parseFloat(num.toFixed(4)).toString();
}

export const getTimeFromNumber = (time: number) => {
  let h: string | number = parseInt((time / 60 / 60 % 24).toString())
  if (h>=0) {
    h = h < 10 ? `0${h}`: h
  } else {
    h = "00"
  }
  let m: string | number = parseInt((time / 60 % 60).toString())
  if (m>=0) {
    m= m < 10 ? `0${m}` : m
  } else {
    m = "00"
  }
  let s: string | number = parseInt((time % 60).toString());
  if (s>=0) {
    s = s < 10 ? `0${s}` : s
  } else {
    s = "00"
  }
  return `${h} : ${m} : ${s}`
}
/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';
import styled from 'styled-components'; 
import { useWeb3React } from '@web3-react/core'
import { useScroll } from 'ahooks' 
import KisaragiAbi from 'config/abi/Kisaragi.json'
import useWeb3 from 'hooks/useWeb3'
import Web3 from 'web3'
import web3NoAccount from 'utils/web3'
import { AbiItem } from 'web3-utils'
import { Space, Drawer } from 'antd'
import Login from 'components/Login'
import { interceptAdd, formatDateWithSlash, changeLanguage, initLangage } from 'utils/utils'
// import translations from 'config/localization/en-US.json'
import { useHistory } from 'react-router-dom'
import { Player } from "video-react"
import { resources } from 'i18n/resources'
import {  } from './indexStyles'

// console.log(21, translations?.["The main features of -KISARAGI- are that each piece is original and has stunning graphics. KISARAGI also has utilities such as a community pass that can be used by the GuildQB community, and can be used in future games developed by GuildQB. KISARAGI has several features not found in previous NFTs."])

const StyleBase = styled.div``

const Wrapper = styled(StyleBase)<{isMobile?: boolean}>`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100vw;
  ${({isMobile}) => isMobile ?  'min-width' : '' }: 1440px;
  background: #000000;
  >main {
    display: flex;
    justify-content: center;
    width: 100%;
    color: #FFFFFF;
    >.main {
      background: url('/images/home/Gradient bg.png')  no-repeat;
      background-size: 100% 100%;
      background-position: 0 725px;
      width: ${({isMobile}) => isMobile ?  '1312px' : 'calc(100vw - 30px)' };
      animation: top 1s;
    }
  }
`
const StyledHeader = styled(StyleBase)<{isMobile?: boolean}>`
    position: absolute;    
    display: flex;
    justify-content: ${({isMobile}) => isMobile ?  'space-between' : 'space-between' };
    align-items: center;
    width: ${({isMobile}) => isMobile ?  '1312px' : '95%' };
    padding: ${({isMobile}) => isMobile ?  '0 15px' : '0 15px' };
    padding-left: ${({isMobile}) => isMobile ?  '' : '0' };
    padding-top: ${({isMobile}) => isMobile ?  '' : '15px' };
    margin-top: 12px;
    ${({isMobile}) => isMobile ?  'z-index' : 'z-index' }: 9999;
    .logo {
      width: ${({isMobile}) => isMobile ?  '129px' : '75px' };
      height: ${({isMobile}) => isMobile ?  '85px' : '51px' };
      >img {
        width: 100%;
        height: 100%;
      }
    }
    .menu {
      display: flex;
      justify-content: center;
      .menu-text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'M PLUS 1';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        text-align: right;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        >div {
          margin-right: 32px;
        }
        .en {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 92px;
          height: 48px;
          background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
          border-radius: 25px;
        }
      }
    }
    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${({isMobile}) => isMobile ?  '202px' : '150px' };
      height: ${({isMobile}) => isMobile ?  '48px' : '42px' };
      background: linear-gradient(93.19deg, #20AFFF 5.25%, #A8E0FF 96.59%);
      border-radius: 25px;
    }
    .t-menu {
      margin-left: 12px;
      width: 42px;
      height: 42px;
      >img {
        width: 42px;
        height: 42px;
      }
    }
`

const Banner = styled(StyleBase)<{isMobile?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({isMobile}) => isMobile ?  '600px' : '351px' };
  // background: ${({isMobile}) => isMobile ?  "url('/images/home/banner/banner.png')" : "url('/images/home/banner/h5-banner.png')" };
  // background-size: ${({isMobile}) => isMobile ?  '100% 100%' : '100% 140%' };
  // background-position-y: ${({isMobile}) => isMobile ?  '0' : '-73px' };
  >div {
    width: 100%;
    height: ${({isMobile}) => isMobile ?  '600px' : '100%' };
    overflow: hidden;
    .ruyue-video {
      padding-top: ${({isMobile}) => isMobile ?  '0px !important' : '86px !important' };
    }
    .video-z {    
      position: absolute;
      width: 92%;
      height: ${({isMobile}) => isMobile ?  '600px' : '351px' };
      z-index: 5;
    }
    >div {
      width: 100%;
      height: ${({isMobile}) => isMobile ?  '600px' : '351px' };
      >video {    
        // transform: ${({isMobile}) => isMobile ?  '' : 'translateX(-195px) translateY(-140px)' };
        width: ${({isMobile}) => isMobile ?  '100%' : '100%' } ;
        height: ${({isMobile}) => isMobile ?  '600px' : '100%' };
      }
    }
  }
`

const MintNow = styled(StyleBase)<{isMobile?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
  box-shadow: 0px 0px 40px rgba(0, 5, 17, 0.23);
  border-radius: 20px;
  : ${({isMobile}) => isMobile ?  'height' : '' }600px;
  width: 100%;
  .context {
    display: flex;
    flex-direction: ${({isMobile}) => isMobile ?  '0' : 'column' };
    height: 100%;
    width: 100%;
    .left-img {
      img {
        width: ${({isMobile}) => isMobile ?  '528px' : '100%' };
        ${({isMobile}) => isMobile ?  'height' : '' }: 600px;
      }
    }
    .reight-get {
      display: ${({isMobile}) => isMobile ?  '' : 'flex' };
      justify-content: ${({isMobile}) => isMobile ?  '' : 'center' };
      align-items: ${({isMobile}) => isMobile ?  '' : 'center' };
      flex-direction: ${({isMobile}) => isMobile ?  '' : 'column' };
      width: ${({isMobile}) => isMobile ?  '784px' : '100%' };
      ${({isMobile}) => isMobile ?  'height' : '' }: 600px;
      padding-left: ${({isMobile}) => isMobile ?  '32px' : '0' };
      .get-y {
        width: ${({isMobile}) => isMobile ?  '720px' : '100%' };
        ${({isMobile}) => isMobile ?  'height' : '' }: 64px;
        margin-top: ${({isMobile}) => isMobile ?  '121px' : '32px' };
        padding-left: ${({isMobile}) => isMobile ?  '' : '15px' };
      }
      .time-remaning {
        width: ${({isMobile}) => isMobile ?  '159px' : '100%' };
        height: ${({isMobile}) => isMobile ?  '19px' : '17px' };
        margin-top: ${({isMobile}) => isMobile ?  '40px' : '28px' };
        font-family: 'M PLUS 1';
        font-style: normal;
        font-weight: 700;
        font-size: ${({isMobile}) => isMobile ?  '18px' : '16px' };
        line-height: 107%;
        padding-left: ${({isMobile}) => isMobile ?  '' : '15px' };
      }
      .mint-a {
        margin-top: 32px;
        margin-left: ${({isMobile}) => isMobile ?  '15px' : '0' };
        margin-bottom: ${({isMobile}) => isMobile ?  '0' : '44px' };
        a {
          color: #FFFFFF;
        }
      }
      .timer-box {
        display: flex;
        margin-top: ${({isMobile}) => isMobile ?  '24px' : '20px' };
        >div {
          display: flex;
          justify-content: center;
          align-items: center;    
          flex-direction: column;
          width: ${({isMobile}) => isMobile ?  '120px' : '20vw' };
          height: ${({isMobile}) => isMobile ?  '116px' : '19vw' };
          background: rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          .timer {
            font-family: 'M PLUS 1';
            font-style: normal;
            font-weight: 700;
            font-size: ${({isMobile}) => isMobile ?  '44px' : '28px' };
          }
          .timer-text {
            amrgin-top: 6px;
            font-family: 'IBM Plex Sans JP';
            font-style: normal;
            font-weight: 600;
            font-size:  ${({isMobile}) => isMobile ?  '14px' : '12px' };
            opacity: 0.5;
          }
        }
        >span {
          font-family: 'M PLUS 1';
          font-style: normal;
          font-size: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: ${({isMobile}) => isMobile ?  '0 18px' : '0' };
        }
      }
      .mint-now {
        margin-top: ${({isMobile}) => isMobile ?  '36px' : '20px' };
        display: flex;
        justify-content: center;
        align-items: center;  
        width: ${({isMobile}) => isMobile ?  '636px' : 'calc(100% - 30px)' };
        height: 60px;
        letter-spacing: 0.02em;
        font-family: 'M PLUS 1';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        background: linear-gradient(93.19deg, #20AFFF 5.25%, #A8E0FF 96.59%);
        border-radius: 37px;
        color: #0D1424;
      }
      .sold-out {
        background: rgba(255, 255, 255, 0.06);
        color: #FFFFFF;
        opacity: 0.4;
      }
    }
  }
`

const ProjectConcept = styled(StyleBase)<{isMobile?: boolean}>`
  margin-top: ${({isMobile}) => isMobile ?  '39px' : '32px'};
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
  box-shadow: 0px 0px 40px rgba(0, 5, 17, 0.23);
  border-radius: 20px;
  ${({isMobile}) => isMobile ?  'height' : ''}: 642px;
  width: 100%;
  .context {
    display: flex;
    ${({isMobile}) => isMobile ?  '' : 'flex-direction'}: column-reverse;
    width: 100%;
    ${({isMobile}) => isMobile ?  'height' : ''}: 100%;
    .left-p {
      width: 100%;
      padding-right: 32px;
      ${({isMobile}) => isMobile ?  'height' : ''}: 642px;
      padding: ${({isMobile}) => isMobile ?  '' : '0 15px'};
      padding-left: ${({isMobile}) => isMobile ?  '32px' : ''};
      padding-bottom: ${({isMobile}) => isMobile ?  '' : '48px'};
      >div {
        width: 100%;
      }
      .pro-c {
        margin-top: ${({isMobile}) => isMobile ?  '32px' : '32px'};
      }
      .the-main {
        margin-top: ${({isMobile}) => isMobile ?  '28px' : '20px'};
      }
      .feature-1 {
        margin-top: ${({isMobile}) => isMobile ?  '27px' : '20px'};
      }
      .kisaragi-has-a {
        margin-top: ${({isMobile}) => isMobile ?  '16px' : '12px'};
      }
      .feature-2 {
        margin-top: ${({isMobile}) => isMobile ?  '28px' : '20px'};
      }
      .kisaragi-is-a {
        margin-top: ${({isMobile}) => isMobile ?  '16px' : '12px'};
      }
    }
    .right-img {
      img {
        width: ${({isMobile}) => isMobile ?  '640px' : '100%'};
        ${({isMobile}) => isMobile ?  'height' : ''}: 642px;
      }
    }
  }
`
const Utility = styled(StyleBase)<{isMobile?: boolean}>`
  margin-top: ${({isMobile}) => isMobile ?  '154px' : '86px'};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .utility {
  }
  .context {
    margin-top: ${({isMobile}) => isMobile ?  '55px' : '40px'};
    display: flex;
    justify-content: space-between;
    width: 100%;
    ${({isMobile}) => isMobile ?  '' : 'flex-direction'}: column;
    .utility-item-box {
      width: ${({isMobile}) => isMobile ?  '304px' : '100%'};
      ${({isMobile}) => isMobile ?  'height' : ''}: 381px;
      padding: ${({isMobile}) => isMobile ?  '' : '0 15px'};
      padding-top: ${({isMobile}) => isMobile ?  '43.52px' : '34.93px'};
      padding-left: ${({isMobile}) => isMobile ?  '24px' : ''};
      padding-bottom: ${({isMobile}) => isMobile ?  '' : '31px'};
      background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
      border: 1px solid #1E2635;
      border-radius: 12px;
      margin-bottom: ${({isMobile}) => isMobile ?  '' : '24px'};
      >img {
        width: ${({isMobile}) => isMobile ?  '72px' : '60px'};
        height: ${({isMobile}) => isMobile ?  '65.78px' : '54.82px'};
      }
      >div {
        width: ${({isMobile}) => isMobile ?  '246px' : '100%'};
      }
      .t1 {
        margin-top: 34.7px
      }
      .t2 {
        margin-top: 18px
      }
    }
  }
`

const ProjectRoadmap = styled(StyleBase)<{isMobile?: boolean}>`
  height: ${({isMobile}) => isMobile ?  '733px' : '633px' };
  >.project-roadmap {
    margin-top: ${({isMobile}) => isMobile ?  '187px' : '100px' };
    // ${({isMobile}) => isMobile ?  '' : 'width' }: 70%;
    text-align: center;
  }
  >.arrow {
    width: ${({isMobile}) => isMobile ?  '1440px' : '100vw' };
    transform: ${({isMobile}) => isMobile ?  'translateX(-64px)' : 'translateX(-15px)' };
    position: absolute; 
    >.arrow-left {
      position: absolute; 
      top: 378px;
    }
    >.scroll-m {
      position: absolute;
      top: 733px;
      width: 1440px;
      height: 2px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 2px;
      >.scroll-z {
        transition: transform 1s;
        width: 750px;
        height: 3px;
        background: #FFFFFF;
        border-radius: 25px;
      }
    }

    >.arrow-right {
      position: absolute; 
      right: 8px;
      top: 378px;
    }
  }
  >.context {
    position: absolute;    
    transform: ${({isMobile}) => isMobile ?  'translateX(-64px)' : 'translateX(-15px)' };
    width: ${({isMobile}) => isMobile ?  '1440px' : '100vw' };
    overflow-x: ${({isMobile}) => isMobile ?  'clip' : 'scroll' };
    overflow-y: clip;
    height: ${({isMobile}) => isMobile ?  '733px' : '633px' };
    /*---滚动条默认显示样式--*/ 
    ::-webkit-scrollbar-thumb{ 
      background-color:#018EE8; 
      height:50px; 
      outline-offset:-2px; 
      outline:2px solid #fff; 
      -webkit-border-radius:4px; 
      border: 2px solid #fff;    
    }
  
    /*---鼠标点击滚动条显示样式--*/ 
    ::-webkit-scrollbar-thumb:hover{ 
      background-color:#FB4446; 
      height:50px; 
      -webkit-border-radius:4px;  
    }
  
    /*---滚动条大小--*/ 
    ::-webkit-scrollbar{ 
      width:2px; 
      height:2px; 
    }
  
    /*---滚动框背景样式--*/ 
    ::-webkit-scrollbar-track-piece{ 
      background-color:#2A303E; 
      -webkit-border-radius:0; 
    }
    >.project-roadmap {
      transition: transform 1s;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .progress-bar {
        margin-top: ${({isMobile}) => isMobile ?  '93px' : '59px' };
        width: 100%;
        height: 70px;
        .progress-bar-item {
          width: ${({isMobile}) => isMobile ?  '352px' : '303px' };
          position: absolute;
          >div {
            height: 4px;
          }
          >img {
            position: absolute;
            top: -36px;
          }
          .phase-box {
            position: absolute;
            width: ${({isMobile}) => isMobile ?  '416px' : '255px' };
            top: 60px;
            .t1 {
            }
            .t2 {
              margin-top: 16px;
              height: ${({isMobile}) => isMobile ?  '80px' : '117px' };
            }
            >img {
              margin-top: ${({isMobile}) => isMobile ?  '24px' : '47px' };
              width: ${({isMobile}) => isMobile ?  '416px' : '255px' };
              height: ${({isMobile}) => isMobile ?  '360px' : '257px' };
            }
          }
        }
        .progress-bar-1 {
          background: #20AFFF;
          >img {
            left: ${({isMobile}) => isMobile ?  '70px' : '28px' };
          }
          .phase-box1 {
            left: ${({isMobile}) => isMobile ?  '70px' : '28px' };
          }
        }
        
        .progress-bar-2 {
          position: absolute;
          left: ${({isMobile}) => isMobile ?  '352px' : '251px' };
          background: linear-gradient(93.19deg, #20AFFF 5.25%, #A8E0FF 96.59%);
          >img {
            left: ${({isMobile}) => isMobile ?  '160px' : '84px' };
          }
          .phase-box2 {
            left: ${({isMobile}) => isMobile ?  '160px' : '84px' };
            .t2 {
              // width: 276px;
            }
          }
        }
    
        .progress-bar-3 {
          position: absolute;
          left: ${({isMobile}) => isMobile ?  '704px' : '500px' };
          background: rgba(255, 255, 255, 0.12);
          >img {
            left: ${({isMobile}) => isMobile ?  '257px' : '128px' };
          }
          .phase-box3 {
            left: ${({isMobile}) => isMobile ?  '257px' : '128px' };
          }
        }
    
        .progress-bar-4 {
          position: absolute;
          left: ${({isMobile}) => isMobile ?  '1056px' : '803px' };
          background: rgba(255, 255, 255, 0.12);
          >img {
            left: ${({isMobile}) => isMobile ?  '352px' : '120px' };
          }
          .phase-box4 {
            left: ${({isMobile}) => isMobile ?  '352px' : '120px' };
          }
        }
      }
    }
  }
`

const Partners = styled(StyleBase)<{isMobile?: boolean}>`
  height: ${({isMobile}) => isMobile ?  '859px' : '663px' };
  >.context {
    position: absolute;   
    transform: ${({isMobile}) => isMobile ?  'translateX(-64px)' : 'translateX(-15px)' };
    width: ${({isMobile}) => isMobile ?  '1440px' : '100vw' };
    // overflow: hidden;
    height: ${({isMobile}) => isMobile ?  '859px' : '663px' };
    >.partners {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 161px;
      overflow: hidden;
      .partners-title {
        margin-top: 80px;
      }
      .img-logo-box {
        .logo-box1,.logo-box2,.logo-box3,.logo-box4,.logo-box5 {
          display: flex;
          >img {
            margin-right: 32px;
            width: ${({isMobile}) => isMobile ?  '304px' : '143px' };
            height: ${({isMobile}) => isMobile ?  '180px' : '84px' };
          }
        }
        .logo-box1 {
          animation: Partners1 10s;
          transform: translateX(-1296px);
          animation-iteration-count: infinite; 
          animation-timing-function: linear;
          margin-top: ${({isMobile}) => isMobile ?  '67px' : '41px' };
        }
        .logo-box2 {
          animation: Partners2 10s;
          transform: translateX(720px);
          animation-iteration-count: infinite; 
          animation-timing-function: linear;
          margin-top: ${({isMobile}) => isMobile ?  '32px' : '13px' };;
        }
        .logo-box3 {
          animation: Partners3 10s;
          transform: translateX(364px);
          animation-iteration-count: infinite; 
          animation-timing-function: linear;
          margin-top: ${({isMobile}) => isMobile ?  '32px' : '13px' };;
        }
        .logo-box4 {
          animation: Partners4 10s;
          transform: translateX(-336px);
          animation-iteration-count: infinite; 
          animation-timing-function: linear;
          margin-top: ${({isMobile}) => isMobile ?  '32px' : '13px' };;
        }
        .logo-box5 {
          animation: Partners5 10s;
          transform: translateX(364px);
          animation-iteration-count: infinite; 
          animation-timing-function: linear;
          margin-top: ${({isMobile}) => isMobile ?  '32px' : '13px' };;
        }
        @keyframes Partners1 {
          0% {
            transform: translateX(-1296px);
          }
          100% {
            transform: translateX(720px);
          }
        }
        @keyframes Partners2 {
          0% {
            transform: translateX(720px);
          }
          100% {
            transform: translateX(-1296px);
          }
        }
        
        @keyframes Partners3 {
          0% {
            transform: translateX(364px);
          }
          100% {
            transform: translateX(-336px);
          }
        }
        @keyframes Partners4 {
          0% {
            transform: translateX(-336px);
          }
          100% {
            transform: translateX(364px);
          }
        }
        @keyframes Partners5 {
          0% {
            transform: translateX(364px);
          }
          100% {
            transform: translateX(-336px);
          }
        }
      }
    }
  }
`

const CollectionKisaragi = styled(StyleBase)<{isMobile?: boolean}>`
  height: ${({isMobile}) => isMobile ?  '837px' : '658px' };
  >.context {
    position: absolute;   
    transform: ${({isMobile}) => isMobile ?  'translateX(-64px)' : 'translateX(-15px)' };
    width: ${({isMobile}) => isMobile ?  '1440px' : '100vw' };
    overflow: hidden;
    height: ${({isMobile}) => isMobile ?  '837px' : '658px' };
    >.arrow-left {
      position: absolute; 
      top: 378px;
    }

    >.arrow-right {
      position: absolute; 
      right: 8px;
      top: 378px;
    }
    >.collection-kisaragi {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .collection-kisaragi-title {
        margin-top: 80px;
        text-align: ${({isMobile}) => isMobile ?  '' : 'center' };
      }
      .img-big-box {
        margin-top: 60px;
        display: flex;
        transition: transform 1s;
        .img-box {    
          display: flex;
          justify-content: start;
          align-items: center;
          flex-direction: column;
          width: ${({isMobile}) => isMobile ?  '416px' : '315px' };
          height: ${({isMobile}) => isMobile ?  '553px' : '428px' };
          margin-right: 32px;
          background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
          border: 1px solid #1E2635;
          border-radius: 12px;
          >img {
            width: ${({isMobile}) => isMobile ?  '416px' : '100%' };
            height: ${({isMobile}) => isMobile ?  '423px' : '100%' };
          }
          .vesti {
            width: ${({isMobile}) => isMobile ?  '368px' : '283px' };
            height: ${({isMobile}) => isMobile ?  '52px' : '42px' };
            text-align: center;
            margin: ${({isMobile}) => isMobile ?  '' : '23px 0' };
            margin-top: ${({isMobile}) => isMobile ?  '32px' : '' };
          }
        }
      }
    }
  }
`

const TermsOfUse =  styled(StyleBase)<{isMobile?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({isMobile}) => isMobile ?  '1312px' : '100%' };
  height: ${({isMobile}) => isMobile ?  '784px' : '623px' };
  background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
  box-shadow: 0px 0px 40px rgba(0, 5, 17, 0.23);
  border-radius: 20px;
  margin-top: ${({isMobile}) => isMobile ?  '80px' : '20px' };
  >.context {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    height: 100%;
    margin-top: 64px;
    .ktou-box {
      display: flex;
      justify-content: start;
      align-items: center;
      flex-direction: column;
      width: ${({isMobile}) => isMobile ?  '1088px' : '100%' };
      ${({isMobile}) => isMobile ?  'height' : '' }: 528px;
      margin-top: ${({isMobile}) => isMobile ?  '76px' : '52px' };
      background: #1A2130;
      border: 1px solid #1E2635;
      border-radius: 20px;
      padding: ${({isMobile}) => isMobile ?  '48px 0' : '24px 0%' };
      .ktou {
        // margin-top: 48px;
      }
      .ktou-context {
        padding: 0 40px;
        height: 406px;
        overflow-x: clip;
        overflow-y: scroll;
        /*---滚动条默认显示样式--*/ 
        ::-webkit-scrollbar-thumb{ 
          background-color:#018EE8; 
          height:50px; 
          outline-offset:-2px; 
          outline:2px solid #fff; 
          -webkit-border-radius:4px; 
          border: 2px solid #fff; 
        }
      
        /*---鼠标点击滚动条显示样式--*/ 
        ::-webkit-scrollbar-thumb:hover{ 
          background-color:#FB4446; 
          height:50px; 
          -webkit-border-radius:4px; 
        }
      
        /*---滚动条大小--*/ 
        ::-webkit-scrollbar{ 
          width:2px; 
          height:2px; 
        }
      
        /*---滚动框背景样式--*/ 
        ::-webkit-scrollbar-track-piece{ 
          background-color:#2A303E; 
          -webkit-border-radius:0; 
        }
        .tou {
          margin-top: 32px;
        }
        .z-ktou {
          margin-top: 20px;
          text-align: center;
        }
        .wtk {
          margin-top: 20px;
        }
        .wet { 
          margin-top: 20px;
        }
      }
    }
  }
`

const JoinOurCommunity = styled(StyleBase)<{isMobile?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({isMobile}) => isMobile ?  '80px' : '60px' };
  >.context {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    >.ry-logo {
      width: 157px;
      height: 104px;
      >img {
        width: 157px;
        height: 104px;
      }
    }
    >.join-oc {
      margin-top: ${({isMobile}) => isMobile ?  '28px' : '32px' };
      text-align: ${({isMobile}) => isMobile ?  '' : 'center' };
    }
    
    .wl-img {
      margin-top: ${({isMobile}) => isMobile ?  '48px' : '32px' };
      width: ${({isMobile}) => isMobile ?  '' : '100vw' };
      display: ${({isMobile}) => isMobile ?  '' : 'flex' };
      justify-content: ${({isMobile}) => isMobile ?  '' : 'center' };
      >img {
        width: ${({isMobile}) => isMobile ?  '140px' : '97px' };
        height: ${({isMobile}) => isMobile ?  '140px' : '97px' };
      }
      >.img1 {
        transform: translateX(30px)
      }
      >.img2 {
        transform: translateX(10px)
      }
      >.img3 {
        transform: translateX(-10px)
      }
      >.img4 {
        transform: translateX(-30px)
      }
    }
  }
`
const Footer = styled(StyleBase)<{isMobile?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  >.context {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    font-family: 'IBM Plex Sans JP';
    font-style: normal;
    font-weight: 300;
    font-size: ${({isMobile}) => isMobile ?  '16px' : '14px' };
    line-height: 140%;
    color: #FFFFFF;
    opacity: 0.8;
    >.line {
      img {
        width: ${({isMobile}) => isMobile ?  '' : '100vw' };
      }
    }
    >.w-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: ${({isMobile}) => isMobile ?  '498px' : '273px' };
      margin-top: 48px;
      flex-wrap: wrap;
      line-height: 49px;
      padding-bottom: ${({isMobile}) => isMobile ?  '' : '20px' };
      >div {
        text-decoration-line: underline;
        opacity: 0.8;
      }
    }
  }
`

const MobailMenu = styled(StyleBase)` 
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .menu-text {
    color: #FFFFFF;
    margin-top: 183px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    >div {
      margin-bottom: 40px;
    }
    .en {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 8px;
      width: 100px;
      height: 48px;
      background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
      border-radius: 25px;
      margin-bottom: 3px;
    }
  }
  .wl-img {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    >img {
      width: 79px;
      height: 79px;
    }
  }
`

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}

export default function Index(props: any) {
  const { t } = useTranslation();
  const web3 = useWeb3()
  const history = useHistory()
  const ProjectRoadmapContext = useRef(null);
  const timer = useRef(null)
  const player = useRef(null)
  const getRoundLenghtNum = useRef(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gyTimer,setGyTimer] = useState({
    d: '00',
    h: '00',
    m: '00',
    s: '00'
  })
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 769px)').matches,
  );
  const [isShowMenu, setIsShowMenu] = useState(false)
  const { account } = useWeb3React()
  const [ckwebkitTransform, setCkwebkitTransform] = useState(0)
  const [projectRoadmapTransform, setProjectRoadmapTransform] = useState(0)
  const [scrollz, setScrollz] = useState(0)
  const [arrowMap180, setArrowMap180] = useState(true)
  const [arrowConTrueLeft, setArrowConTrueLeft] = useState(true)
  const [arrowConTrueRight, setArrowConTrueRight] = useState(false)
  const [languageShow, setLanguageShow] = useState(false)
  const [mintNowTerm, setMintNowTerm] = useState(-1)
  const allTermData = useRef(JSON.parse(localStorage.getItem('allTermData') || '{}'))
  const kaAdd = '0x63787eaA0BEB239aE9F0e684b199854b6d3c797B'
  

  useEffect(() => {
    window
      .matchMedia('(min-width: 769px)')
      .addEventListener('change', (e) => {
        setMatches(e.matches)
        setIsShowMenu(false)
      });
  }, []);

  // 获取期数数量 view
  const getRoundLenght = async () => {
    const termNum = await getContract(KisaragiAbi, kaAdd, web3).methods.getRoundLenght().call()
    getRoundLenghtNum.current = termNum
    return termNum
  }
  
  // 获取全部期数数据 view
  const getRounds = async () => {
    let term1,term2,term3;
    // const num = await getRoundLenght();
    // for (let index = 0; index < num; index++) {
    //   term1 = await getContract(KisaragiAbi, kaAdd, web3).methods.rounds(index).call()
    // }
    
    term1 = await getContract(KisaragiAbi, kaAdd, web3).methods.rounds(0).call()
    term2 = await getContract(KisaragiAbi, kaAdd, web3).methods.rounds(1).call()
    term3 = await getContract(KisaragiAbi, kaAdd, web3).methods.rounds(2).call()
    const newAllTermData = {
      term1,term2,term3
    }
    localStorage.setItem('allTermData', JSON.stringify(newAllTermData))
    allTermData.current = newAllTermData
  }

  
  // 用户是否在白名单 view
  const getRoundWhiteList = async () => {
    console.log(26, mintNowTerm)
    if(mintNowTerm === 4) {
      return false
    }
    const term = await getContract(KisaragiAbi, kaAdd, web3).methods.getRoundWhiteList(0, account).call()
    console.log(55, term)
    return term
  }

  // 用户某期是否可购买 view
  const isInWL = async () => {
    if(mintNowTerm === -1 || mintNowTerm === 0) {
      return false
    }
    const term = await getContract(KisaragiAbi, kaAdd, web3).methods.isInWL(mintNowTerm-1, account).call()
    console.log("term", term)
    return term
  }

  // 用户某期可购买数量 view
  const getBuyAmount = async () => {
    if(mintNowTerm === 0 || mintNowTerm === -1) {
      return 0
    }
    const term = await getContract(KisaragiAbi, kaAdd, web3).methods.getBuyAmount(mintNowTerm-1, account).call()
    console.log("term", mintNowTerm-1, term)
    return term
  }

  // 用户购买 do
  const mint = async (v) => {
    if(mintNowTerm === 4) return
    console.log(1014, mintNowTerm-1, v, allTermData.current?.[`term${mintNowTerm}`]?.salePrice)
    const term = await getContract(KisaragiAbi, kaAdd, web3).methods.mint(mintNowTerm-1, v).call({value: allTermData.current?.[`term${mintNowTerm}`]?.salePrice})
    console.log("term", term)
  }  
  
  // NFT 是否存在
  const exists = async (v) => {
    const term = await getContract(KisaragiAbi, kaAdd, web3).methods.exists(v).call()
    console.log("term", term)
    return term
  }

  const mintNow = async () => { 
    console.log(1022, mintNowTerm)
    if(!account) {
      setIsModalOpen(true)
      return
    }
    if(mintNowTerm === 0) {
      return
    }
    const num = await getBuyAmount()
    console.log(1030, num)
    if(num !== '0'){
      try {
        console.log(1037, allTermData.current?.[`term${mintNowTerm}`]?.salePrice)
        const cc = await mint(1)
        console.log(1039, cc)
      } catch (error) {
        console.log(1040, error)
      }
      // props?.useMessage((pre)=>({isShow:true,isMf: true}))
      // await getRounds()
    } else {
      // props?.useMessage((pre)=>({isShow:true,isMf: false}))
      // console.log('没有可购买数量')
    }
   }

  const currentTerm = async () => { 
    const num = await getRoundLenght() || 0;
    if(num <= 0) {
      setMintNowTerm(-1)
      return
    }
    if(num > 0 && !allTermData.current?.term1){
      await getRounds()
      setMintNowTerm(num+1)
      return
    }
    for (let index = 1; index <= num + 1; index++) {
      if(index === num + 1) {
        setMintNowTerm(0)
        getRounds()
        break
      }
      if(allTermData.current?.[`term${index}`]?.startTime>new Date().getTime()/1000){
        setMintNowTerm(0)
        countDown(allTermData.current?.[`term${index}`]?.startTime)
        return
      }
      if(allTermData.current?.[`term${index}`]?.startTime<new Date().getTime()/1000 && allTermData.current?.[`term${index}`]?.endTime>new Date().getTime()/1000){
        setMintNowTerm(index)
        countDown(allTermData.current?.[`term${index}`]?.endTime)
        return
      }  
    }  
    // if(allTermData.current?.term1?.startTime>new Date().getTime()/1000){
    //   setMintNowTerm(0)
    //   console.log(1072, new Date(allTermData.current?.term1?.startTime*1000), new Date().getTime()/1000)
    //   countDown(allTermData.current?.term1?.startTime)
    //   return
    // }
    // if(allTermData.current?.term1?.startTime<new Date().getTime()/1000 && allTermData.current?.term1?.endTime>new Date().getTime()/1000){
    //   setMintNowTerm(1)
    //   countDown(allTermData.current?.term2?.endTime)
    //   return
    // }
    // if(allTermData.current?.term2?.startTime>new Date().getTime()/1000){
    //   setMintNowTerm(0)
    //   console.log(1083)
    //   countDown(allTermData.current?.term1?.startTime)
    //   return
    // }
    // if(allTermData.current?.term2?.startTime<new Date().getTime()/1000 && allTermData.current?.term2?.endTime>new Date().getTime()/1000){
    //   setMintNowTerm(2)
    //   countDown(allTermData.current?.term2?.endTime)
    //   return
    // }
    // if(allTermData.current?.term3?.startTime>new Date().getTime()/1000){
    //   setMintNowTerm(0)
    //   console.log(1094)
    //   countDown(allTermData.current?.term1?.startTime)
    //   return
    // }
    // if(allTermData.current?.term3?.startTime<new Date().getTime()/1000 && allTermData.current?.term3?.endTime>new Date().getTime()/1000){
    //   setMintNowTerm(3)
    //   countDown(allTermData.current?.term3?.endTime)
    // } else {
    //   setMintNowTerm(4)
    //   getRounds()
    // }
   }

  const init = async () => { 
    await getRoundLenght()
    await currentTerm()
   }

  useEffect(() => { 
    init()
    return () => { 
      clearInterval(timer.current)
     }
  }, [mintNowTerm])

  const countDown = (value) => { 
    setGyTimer(formatDateWithSlash((value - new Date().getTime()/1000)))
    timer.current = setInterval(() => { 
      if(value - new Date().getTime()/1000 <= 0) {
        currentTerm()
      }
      setGyTimer(formatDateWithSlash((value - new Date().getTime()/1000)))
    }, 1000)
  }

  return (
    <Wrapper isMobile={matches}>
      <main className='roll'>
        <div className='main'>
          <StyledHeader
            isMobile={matches}>
            <div className='logo'>
              <img src='/images/home/head/logo.png' alt=''/>
            </div>
            <div className='menu'>
              {
                matches && 
                <div className='menu-text'>
                  <div>
                    COLLECTION 
                  </div>
                  <div>
                    ROADMAP
                  </div>
                  <div>
                    CONTACT US
                  </div>
                  <div style={languageShow?{maxHeight: 48, overflow: 'unset'}:{maxHeight: 48, overflow: 'hidden'}}>
                    <div className='en' onClick={()=>setLanguageShow((pre)=>!pre)}>
                      {
                        localStorage.getItem("i18nextLng") === 'en' ? 'ENG' : 'JP'
                      }
                      <img style={languageShow?{transform: 'rotate(-90deg)'}:{}} src='/images/home/head/mdi_chevron-down.png' alt=''/>
                    </div>
                    <div className='en' style={{marginTop: 3, transform: 'translateX(-12px)'}}  onClick={()=> {
                        changeLanguage(localStorage.getItem("i18nextLng") === 'en' ? 'ja' : 'en')
                        
                        setLanguageShow(false)
                      }}>
                      {
                        localStorage.getItem("i18nextLng") === 'en' ? 'JP' : 'ENG'
                      }
                    </div>
                  </div>
                </div>
              }
              <div className='login'>
                <Login
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                >
                  <div className={account ? 'styledHeaderTextC corsor-pointer' : 'styledHeaderTextC-hover styledHeaderTextC corsor-pointer'}>{interceptAdd(account)}</div>
                </Login>
              </div>
              {
                !matches && 
                <div className='t-menu' onClick={()=>setIsShowMenu((pre)=>!pre)}>
                  <img src={`/images/home/head/${isShowMenu?'header btn2':'header btn'}.png`} alt="" />
                </div>
              }
            </div>
          </StyledHeader>
          <Banner isMobile={matches}>
            <div>
              <div className='video-z' />
              <Player ref={player} poster={matches?"/images/home/banner/banner.png":"/images/home/banner/h5-banner.png"} className="ruyue-video" videoId="video-1" autoPlay muted loop>
                    <source src="/video/home/07_KISARAGI_logo_animation.mp4"/>
              </Player>
            </div>
          </Banner>
          <MintNow isMobile={matches}>
            <div className='context'>
              <div className='left-img'>
                <img src="/images/home/Get your own Kisaragi/Rectangle 5.png" alt="" />
              </div>
              <div className='reight-get'>
                <div className={matches ? 'get-y text-title' : 'get-y h5-text-title'}>Get your own Kisaragi</div>
                <div className='time-remaning'>Time remaning</div>
                <div className='timer-box'>
                  <div>
                    <div className='timer' style={mintNowTerm!==-1?{}:{opacity: 0.5}}>{gyTimer?.d}</div>
                    <div className='timer-text'>Days</div>
                  </div>
                  <span>:</span>
                  <div>
                    <div className='timer' style={mintNowTerm!==-1?{}:{opacity: 0.5}}>{gyTimer?.h}</div>
                    <div className='timer-text'>hours</div>
                  </div>
                  <span>:</span>
                  <div>
                    <div className='timer' style={mintNowTerm!==-1?{}:{opacity: 0.5}}>{gyTimer?.m}</div>
                    <div className='timer-text'>minutes</div>
                  </div>
                  <span>:</span>
                  <div>
                    <div className='timer' style={mintNowTerm!==-1?{}:{opacity: 0.5}}>{gyTimer?.s}</div>
                    <div className='timer-text'>Seconds</div>
                  </div>
                </div>
                <div className={account?(mintNowTerm===0||mintNowTerm!==-1?'mint-now text-h3-16':'mint-now sold-out text-h3-16'):'mint-now'} onClick={async ()=> {
                  mintNow()
                }}>{account?(mintNowTerm===0||mintNowTerm!==-1?'Mint Now':'Sold out'):'Connect Wallet'}</div>
                <div className='mint-a'>
                  <a target='_blank' className='text-context16' href="https://script.google.com/macros/s/AKfycbzCrzBfaz8AqA-Ju7zGJqDtlTsb4Sox1C_h3Z029qohXCkgkp6AQThSG6oqmd1vESSX/exec" rel="noreferrer">
                    {t("Click here for the registered address checker", { defaultValue: "Click here for the registered address checker" })}
                  </a>
                </div>
              </div>
            </div>
          </MintNow>
          <ProjectConcept isMobile={matches}>
            <div className='context'>
              <div className='left-p'>
                <div className={matches?'pro-c text-title':'pro-c text-title h5-text-title'}>Project concept</div>
                <div className={matches?'the-main text-context16':'the-main text-context14'}>
                  <div>
                    {
                      t("The main features of -KISARAGI- are that each piece is original and has stunning graphics. ",{ defaultValue: "The main features of -KISARAGI- are that each piece is original and has stunning graphics. " })
                    }
                  </div>
                  <div>
                    {
                      t("Utilities include a community pass for the GuildQB community and for use in future games developed by GuildQB. ",{ defaultValue: "Utilities include a community pass for the GuildQB community and for use in future games developed by GuildQB. " })
                    }</div>
                  <div>
                    {
                      t("KISARAGI has several features not found in previous NFTs.",{ defaultValue: "KISARAGI has several features not found in previous NFTs." })
                    }</div>
                </div>
                <div className={matches?'feature-1 text-h3':'feature-1 h5-text-h3'}>
                    {
                      t("FEATURE 1: UPDATED ILLUSTRATIONS TO KEEP UP WITH THE TIMES",{ defaultValue: "FEATURE 1: UPDATED ILLUSTRATIONS TO KEEP UP WITH THE TIMES" })
                    }
                </div>
                <div className={matches?'kisaragi-has-a text-context16':'kisaragi-has-a text-context14'}>
                  <div>
                    {
                      t("-KISARAGI- has a function that allows holders to exchange their own NFTs for new illustrations. As can be seen from the history of Japanese animation, the illustrations accepted by the masses change with the times. ",{ defaultValue: "-KISARAGI- has a function that allows holders to exchange their own NFTs for new illustrations. As can be seen from the history of Japanese animation, the illustrations accepted by the masses change with the times. " })
                    }
                  </div>
                  <div>
                    {
                      t("In order to have long-term holders keep their NFTs, it will be possible to update the illustrations as the times change. This is a great feature that has never been seen before and prevents the problem of NFT illustrations becoming outdated.",{ defaultValue: "In order to have long-term holders keep their NFTs, it will be possible to update the illustrations as the times change. This is a great feature that has never been seen before and prevents the problem of NFT illustrations becoming outdated." })
                    }
                  </div>
                </div>
                <div className={matches?'feature-2 text-h3':'feature-2 h5-text-h3'}>
                  <div>
                    {
                      t("Feature 2: Illustrations change with the light of the moon",{ defaultValue: "Feature 2: Illustrations change with the light of the moon" })
                    }
                  </div>
                </div>
                <div className={matches?'kisaragi-is-a text-context16':'kisaragi-is-a text-context14'}>
                  {
                    t("-KISARAGI- is a moon-themed NFT. By making it a digital art synchronised with the phase of the moon, it becomes an ever-changing presence in our daily lives. The brightness of the NFT changes according to the brightness of the moon.",{ defaultValue: "-KISARAGI- is a moon-themed NFT. By making it a digital art synchronised with the phase of the moon, it becomes an ever-changing presence in our daily lives. The brightness of the NFT changes according to the brightness of the moon." })
                  }
                </div>
              </div>
              <div className='right-img'>
                <img src="/images/home/Project concept/image 1.png" alt="" />
              </div>
              </div>
          </ProjectConcept>
          <Utility isMobile={matches}>
            <div className='utility text-title'>Utility</div>
            <div className='context'>
              <div className='utility-item-box'>
                <img src="/images/home/Utility/spec.png" alt="" />
                <div className={matches?'t1 text-h3':'t1 h5-text-h3'}>
                  {t("Community Paths", { defaultValue: "Community Paths" })}
                </div>
                <div className='t2 text-context14'>
                  <div>
                    {t("-KISARAGI- the genesis NFT launched by GuildQB, functions as a community pass. ", { defaultValue: "-KISARAGI- the genesis NFT launched by GuildQB, functions as a community pass. " })}
                  </div>
                  <div>
                    {t("Some NFT projects set up their communities and grant them utilities only to sell their NFTs. GuildQB, on the other hand, already has an existing community and the pass is issued while the community is growing. KISARAGI holders will also benefit from a number of advantages, including access to unique information within GuildQB.", { defaultValue: "KISARAGI holders will also benefit from a number of advantages, including access to unique information within GuildQB." })}
                  </div>
                </div>
              </div>
              <div className='utility-item-box'>
                <img src="/images/home/Utility/Rock2.png" alt="" />
                <div className={matches?'t1 text-h3':'t1 h5-text-h3'}>NFT GAME</div>
                <div className='t2 text-context14'>
                  GuildQB has focused on developing NFT games even before announcing KISARAGI.
                  While a typical PFP project will have game development as its vision for the future of NFT, GuildQB&apos;s KISARAGI is a game that is already in development, and this NFT will build on top of that. Two game titles are already in the preparation stage. More details will be announced in the future.
                </div>
              </div>
              <div className='utility-item-box'>
                <img src="/images/home/Utility/Torus.png" alt="" />
                <div className='t1 text-h3'>PRODUCTS</div>
                <div className='t2 text-context14'>GuildQB is developing Web 3.0 products to lead mobile gamers to Web 3.0. Kisaragi NFT holders can increase the efficiency of Earn in Social-Fi products, participate in the launch of new game projects early, and more.</div>
              </div>
              <div className='utility-item-box'>
                <img src="/images/home/Utility/Cheese Half.png" alt="" />
                <div className={matches?'t1 text-h3':'t1 h5-text-h3'}>3D avatars</div>
                <div className='t2 text-context14'>In the future, GuildQB is planning to collaborate with VtuberDAO to create 3D avatars from the most popular Kisaragi design and debut them from VtuberDAO as Vtubers belonging to GuildQB. Development is underway with the goal of creating and operating a digital human with complete AI, with no so-called middle man present.</div>
              </div>
            </div>
          </Utility>
          <ProjectRoadmap isMobile={matches}>
            <div className={matches?'project-roadmap text-title':'project-roadmap h5-text-title'}>
              Project Roadmap
            </div>
            <div className='context' ref={ProjectRoadmapContext}>
              <div className='project-roadmap' style={{transform: `translateX(${projectRoadmapTransform}px)`}}>
                <div className='progress-bar'>
                  <div className='progress-bar-item progress-bar-1'>
                    <div />
                    <img src="/images/home/Project Roadmap/Frame 11.png" alt="" />
                    <div className='phase-box phase-box1'>
                      <div className={matches?'t1 text-h3':'t1 h5-text-h3'}>Phase 1</div>
                      <div className='t2 text-context14'>
                        Guild QB Community Launched
                        Partnership with Top Global Gaming Guilds
                        Hosted Axie Origin world&apos;s first guild competition
                        Exhibited at Tokyo Game Show 2022 & won the Axie Tournament
                      </div>
                      <img src="/images/home/Project Roadmap/Rectangle 24.png" alt="" />
                    </div>
                  </div>
                  <div className='progress-bar-item progress-bar-2'>
                    <div />
                    <img src="/images/home/Project Roadmap/Frame 12.png" alt="" />
                    <div className='phase-box phase-box2'>
                      <div className='t1 text-h3'>Phase 2</div>
                      <div className='t2 text-context14'>
                        Establishes Japan&apos;s First Axie Pro Team
                        Genesis NFT {`"KISARAGI"`} is launched
                        Launched official website
                        World No.1 in something of Axie Origin
                      </div>
                      <img src="/images/home/Project Roadmap/Rectangle 25.png" alt="" />
                    </div>
                  </div>
                  <div className='progress-bar-item  progress-bar-3'>
                    <div />
                    <img src="/images/home/Project Roadmap/Frame 13.png" alt="" />
                    <div className='phase-box phase-box3'>
                      <div className={matches?'t1 text-h3':'t1 h5-text-h3'}>Phase 3</div>
                      <div className='t2 text-context14'>
                        QB Quest Launch {`"KISARAGI"`} Utility Implementation OHARAI NFT Launch $GQB Launch $GQB Staking Launch QB Launch Pad
                      </div>
                      <img src="/images/home/Project Roadmap/Rectangle 26.png" alt="" />
                    </div>
                  </div>
                  <div className='progress-bar-item  progress-bar-4'>
                    <div />
                    <img src="/images/home/Project Roadmap/Frame 14.png" alt="" />
                    <div className='phase-box phase-box4'>
                      <div className={matches?'t1 text-h3':'t1 h5-text-h3'}>Phase 4</div>
                      <div className='t2 text-context14'>
                        NFT Rental Protocol Launch
                        GuildQB 1st Game Launch
                        GuildQB Ventures
                      </div>
                      <img src="/images/home/Project Roadmap/Rectangle 27.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='arrow'>
              {
                matches && <>
                  <div className={arrowMap180?'arrow-left':'arrow-left arrow180'} onClick={()=>{
                    setProjectRoadmapTransform(0)
                    setScrollz(0)
                    setArrowMap180(true)
                  }}>
                    <img src={arrowMap180?"/images/home/Project Roadmap/arrow left.png":"/images/home/Project Roadmap/arrow riht.png"} alt="" />
                  </div>
                  <div className={arrowMap180?'arrow-right':'arrow-right arrow180'} onClick={()=>{
                    setProjectRoadmapTransform(-467)
                    setScrollz(687)
                    setArrowMap180(false)
                  }}>
                    <img src={arrowMap180?"/images/home/Project Roadmap/arrow riht.png":"/images/home/Project Roadmap/arrow left.png"} alt="" />
                  </div>
                  <div className='scroll-m'>
                    <div className='scroll-z' style={{transform: `translateX(${scrollz}px)`}}/>
                  </div>
                </>
              }
            </div>
          </ProjectRoadmap>
          <Partners isMobile={matches}>
            <div className='context'>
              <div className='partners'>
                <div className={matches?'partners-title text-title':'partners-title h5-text-title'}>Partners</div>
                {
                  matches ? <>
                  <div className='img-logo-box'>
                    <div className='logo-box1'>
                      <img src="/images/home/Partners/Frame 30.png" alt="" />
                      <img src="/images/home/Partners/Frame 29.png" alt="" />
                      <img src="/images/home/Partners/Frame 42.png" alt="" />
                      <img src="/images/home/Partners/Frame 43.png" alt="" />
                      <img src="/images/home/Partners/Frame 44.png" alt="" />
                      <img src="/images/home/Partners/Frame 45.png" alt="" />
                      <img src="/images/home/Partners/Frame 30.png" alt="" />
                      <img src="/images/home/Partners/Frame 29.png" alt="" />
                      <img src="/images/home/Partners/Frame 42.png" alt="" />
                      <img src="/images/home/Partners/Frame 43.png" alt="" />
                      <img src="/images/home/Partners/Frame 44.png" alt="" />
                      <img src="/images/home/Partners/Frame 45.png" alt="" />
                    </div>
                  </div>
                  <div className='img-logo-box'>
                    <div className='logo-box2'>
                      <img src="/images/home/Partners/Frame 44.png" alt="" />
                      <img src="/images/home/Partners/Frame 45.png" alt="" />
                      <img src="/images/home/Partners/Frame 30.png" alt="" />
                      <img src="/images/home/Partners/Frame 29.png" alt="" />
                      <img src="/images/home/Partners/Frame 28.png" alt="" />
                      <img src="/images/home/Partners/Frame 27.png" alt="" />
                      <img src="/images/home/Partners/Frame 44.png" alt="" />
                      <img src="/images/home/Partners/Frame 45.png" alt="" />
                      <img src="/images/home/Partners/Frame 30.png" alt="" />
                      <img src="/images/home/Partners/Frame 29.png" alt="" />
                      <img src="/images/home/Partners/Frame 28.png" alt="" />
                      <img src="/images/home/Partners/Frame 27.png" alt="" />
                    </div>
                  </div>
                  </> : <>
                    <div className='img-logo-box'>
                      <div className='logo-box3'>
                        <img src="/images/home/Partners/Frame 30.png" alt="" />
                        <img src="/images/home/Partners/Frame 42.png" alt="" />
                        <img src="/images/home/Partners/Frame 43.png" alt="" />
                        <img src="/images/home/Partners/Frame 44.png" alt="" />
                        <img src="/images/home/Partners/Frame 30.png" alt="" />
                        <img src="/images/home/Partners/Frame 42.png" alt="" />
                        <img src="/images/home/Partners/Frame 43.png" alt="" />
                        <img src="/images/home/Partners/Frame 44.png" alt="" />
                      </div>
                    </div>
                    <div className='img-logo-box'>
                      <div className='logo-box4'>
                        <img src="/images/home/Partners/Frame 42.png" alt="" />
                        <img src="/images/home/Partners/Frame 30.png" alt="" />
                        <img src="/images/home/Partners/Frame 29.png" alt="" />
                        <img src="/images/home/Partners/Frame 28.png" alt="" />
                        <img src="/images/home/Partners/Frame 42.png" alt="" />
                        <img src="/images/home/Partners/Frame 30.png" alt="" />
                        <img src="/images/home/Partners/Frame 29.png" alt="" />
                        <img src="/images/home/Partners/Frame 28.png" alt="" />
                      </div>
                    </div>
                    <div className='img-logo-box'>
                      <div className='logo-box5'>
                        <img src="/images/home/Partners/Frame 28.png" alt="" />
                        <img src="/images/home/Partners/Frame 42.png" alt="" />
                        <img src="/images/home/Partners/Frame 43.png" alt="" />
                        <img src="/images/home/Partners/Frame 44.png" alt="" />
                        <img src="/images/home/Partners/Frame 28.png" alt="" />
                        <img src="/images/home/Partners/Frame 42.png" alt="" />
                        <img src="/images/home/Partners/Frame 43.png" alt="" />
                        <img src="/images/home/Partners/Frame 44.png" alt="" />
                      </div>
                    </div>
                  </>
                }
                
              </div>
            </div>
          </Partners>
          <CollectionKisaragi isMobile={matches}>
            <div  className='context'>
              <div className='collection-kisaragi'>
                <div className={matches?'collection-kisaragi-title text-title':'collection-kisaragi-title h5-text-title'}>Collection Kisaragi</div>
                <div>
                  <div style={{transform: `translateX(${ckwebkitTransform}px)`}} className='img-big-box'>
                    <div className='img-box'>
                      <img src="/images/home/Collection Kisaragi/image 36.png" alt="" />
                      <div className={matches?'vesti text-h3':'vesti h5-text-h3'}>Vestibulum ac lorem a odio sagittis</div>
                    </div>
                    <div className='img-box'>
                      <img src="/images/home/Collection Kisaragi/image 36-1.png" alt="" />
                      <div className={matches?'vesti text-h3':'vesti h5-text-h3'}>Vestibulum ac lorem a odio sagittis</div>
                    </div>
                    <div className='img-box'>
                      <img src="/images/home/Collection Kisaragi/image 36-2.png" alt="" />
                      <div className={matches?'vesti text-h3':'vesti h5-text-h3'}>Vestibulum ac lorem a odio sagittis</div>
                    </div>
                    <div className='img-box'>
                      <img src="/images/home/Collection Kisaragi/image 36-3.png" alt="" />
                      <div className={matches?'vesti text-h3':'vesti h5-text-h3'}>Vestibulum ac lorem a odio sagittis</div>
                    </div>
                    <div className='img-box'>
                      <img src="/images/home/Collection Kisaragi/image 36-4.png" alt="" />
                      <div className={matches?'vesti text-h3':'vesti h5-text-h3'}>Vestibulum ac lorem a odio sagittis</div>
                    </div>
                    <div className='img-box' style={{marginRight: 0}}>
                      <img src="/images/home/Collection Kisaragi/image 36-5.png" alt="" />
                      <div className={matches?'vesti text-h3':'vesti h5-text-h3'}>Vestibulum ac lorem a odio sagittis</div>
                    </div>
                  </div>
                </div>
              </div>
                <div className={!arrowConTrueLeft?'arrow-left':'arrow-left arrow180'} onClick={()=>setCkwebkitTransform((pre)=>{
                  setArrowConTrueRight(false)
                  if(matches) {
                    if(pre+448 >= 660){
                      setArrowConTrueLeft(false)
                      return 660
                    } 
                    setArrowConTrueLeft(true)
                    return pre+448
                  } 
                  if(pre+346 >= 865){
                    setArrowConTrueLeft(false)
                    return 865
                  } 
                  setArrowConTrueLeft(true)
                  return pre+346
                  })
                }>
                  <img src={!arrowConTrueLeft?"/images/home/Project Roadmap/arrow left.png":"/images/home/Project Roadmap/arrow riht.png"} alt="" />
                </div>
              
              <div className={!arrowConTrueRight?'arrow-right':'arrow-right arrow180'} onClick={()=>setCkwebkitTransform((pre)=>{         
                setArrowConTrueLeft(true)
                if(matches) {
                  if(pre-448 <= -620){
                    setArrowConTrueRight(true)
                    return -620
                  } 
                  setArrowConTrueRight(false)
                  return pre-448
                } 
                if(pre-346 <= -870){
                  setArrowConTrueRight(true)
                  return -870
                } 
                setArrowConTrueRight(false)
                return pre-346
              })}>
                <img src={!arrowConTrueRight?"/images/home/Project Roadmap/arrow riht.png":"/images/home/Project Roadmap/arrow left.png"} alt="" />
              </div>
            </div>
          </CollectionKisaragi>
          <TermsOfUse isMobile={matches}>
            <div className='context'>
              <div className={matches?'text-title':'h5-text-title'}>Terms of use</div>
              <div className='ktou-box'>
                <div className='ktou-context text-context16'>
                  <div className={matches?'z-ktou text-h3':'z-ktou h5-text-h3'}>Kisaragi Terms of use</div>
                  <div className='wtk'>
                    {`
                      Welcome to Kisaragi.com! These terms and conditions outline the rules and regulations for the use of Kisaragi's Website, located at Kisaragi.com.
                      By accessing this website we assume you accept these terms and conditions. Do not continue to use Kisaragi.com if you do not agree to all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of The Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                    `}
                  </div>
                  <div className='wet'>
                    {`
                      We employ the use of cookies. By accessing Kisaragi.com, you agreed to the use of cookies in accordance with the Kisaragi's Privacy Policy.Most  user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                    `}
                  </div>
                </div>
              </div>
            </div>
          </TermsOfUse>
          <JoinOurCommunity isMobile={matches}>
            <div className='context'>
              <div className='ry-logo'>
                <img src="/images/home/Join our community!/KISARAGI_logo 1.png" alt="" />
              </div>
              <div className={matches?'join-oc text-title':'join-oc h5-text-title'}>Join our community!</div>
              <div className='wl-img'>
                <img className='img1' src="/images/home/Join our community!/discord.png" alt="" />
                <img className='img2' src="/images/home/Join our community!/twitter.png" alt="" />
                <img className='img3' src="/images/home/Join our community!/opensea.png" alt="" />
                <img className='img4' src="/images/home/Join our community!/instagram.png" alt="" />
              </div>
            </div>
          </JoinOurCommunity>
          <Footer isMobile={matches}>
            <div className='context' >
              <div className='line'>
                <img src="/images/home/Join our community!/Line 1.png" alt="" />
              </div>
              <div className='w-link'>
                <div>Contact Us</div>
                <div>Collections</div>
                <div>Roadmap</div>
                <div>Privacy Policy</div>
                <div onClick={() => { history.push('/termsOfUse') }}>Terms of Service</div>
              </div>
            </div>
          </Footer>
        </div>
        <Drawer
          title=""
          placement="right"
          width="100%"
          className='h5-menu'
          onClose={()=>setIsShowMenu(false)}
          open={isShowMenu}
          extra={
            <></>
          }
        >
          <MobailMenu>
            <div className='menu-text h5-text-h3'>
              <div>
                COLLECTION
              </div>
              <div>
                ROADMAP
              </div>
              <div>
                CONTACT US
              </div>
              {/* <div className='en'>
                ENG <img src='/images/home/head/mdi_chevron-down.png' alt=''/>
              </div> */}
              <div style={languageShow?{maxHeight: 96, overflow: 'unset'}:{maxHeight: 58, overflow: 'hidden'}}>
                <div className='en' onClick={()=>setLanguageShow((pre)=>!pre)}>
                  {
                    localStorage.getItem("i18nextLng") === 'en' ? 'ENG' : 'JP'
                  }
                  <img style={languageShow?{transform: 'rotate(-90deg)'}:{}} src='/images/home/head/mdi_chevron-down.png' alt=''/>
                </div>
                <div className='en' style={{marginTop: 3}}  onClick={()=> {
                    changeLanguage(localStorage.getItem("i18nextLng") === 'en' ? 'ja' : 'en')
                    setLanguageShow(false)
                  }}>
                  {
                    localStorage.getItem("i18nextLng") === 'en' ? 'JP' : 'ENG'
                  }
                </div>
              </div>
            </div>
            <div className='wl-img'>
              <img className='img1' src="/images/home/Join our community!/discord.png" alt="" />
              <img className='img2' src="/images/home/Join our community!/twitter.png" alt="" />
              <img className='img3' src="/images/home/Join our community!/opensea.png" alt="" />
              <img className='img4' src="/images/home/Join our community!/instagram.png" alt="" />
            </div>
          </MobailMenu>
        </Drawer>
      </main>
    </Wrapper>
  )
}

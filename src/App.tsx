/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useState, useEffect } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import useEagerConnect from 'hooks/useEagerConnect'
import { Modal } from 'antd'
import styled from 'styled-components'; 
import history from './routerHistory'
import Home from './views/Home'
import TermsOfUse from './views/TermsOfUse'
import "i18n/i18n"
import 'antd/dist/reset.css'
import './font.css'
import './globle.css'

const StyleBase = styled.div``

const MintMessage = styled(StyleBase)<{isMobile?: boolean}>` 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  >.cmcp {
    width: ${({isMobile}) => isMobile ?  '' : '98%' };
    color: #FFFFFF;
    line-height: ${({isMobile}) => isMobile ?  '107%' : '124%' };
    margin-top: ${({isMobile}) => isMobile ?  '28px' : '10px' };
  }
  .eds {
    margin-top: ${({isMobile}) => isMobile ?  '20px' : '8px' };
    color: #fff;
  }
  >.vmp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${({isMobile}) => isMobile ?  '40px' : '15px' };
    width: ${({isMobile}) => isMobile ?  '340px' : '80%' };
    height: 60px;
    background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
    border-radius: 37px;
    color: #35B7FF;
    border: 1px solid #35B7FF;
    margin-bottom: ${({isMobile}) => isMobile ?  '40px' : '15px' };
  }
`


const App: React.FC = () => {
  const [message, useMessage] = useState({
    isShow: false,
    isMf: false,
  })  
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 760px)').matches,
  );

  const mesClick = () => { 
    if(message?.isMf) {
      useMessage((pre)=>({...pre,isShow:false}))
    } else {
      useMessage((pre)=>({...pre,isShow:false}))
    }
  }

  useEffect(() => {
    window
      .matchMedia('(min-width: 760px)')
      .addEventListener('change', (e) => {
        setMatches(e.matches)
      });
  }, []);
  
  useEagerConnect()
  return (
    <div>
      <div style={{width: 0, height: 0, overflow: 'hidden'}}>
        <h1>KISARAGI</h1>
      </div>
      <Router history={history}>
        <Switch>
            {/* <Redirect exact from="/" to="/home" /> */}
            <Route exact path="/">
              <Home useMessage={useMessage}/>
            </Route>
            <Route exact path="/termsOfUse">
              <TermsOfUse />
            </Route>
          </Switch>
      </Router>
      
      <Modal title="s" className={matches?'mint-message':'h5-mint-message'} open={message?.isShow} footer={null} closeIcon={<><img src='/images/home/popup/header btn.png' alt=''/></>} onCancel={()=>useMessage((pre)=>({...pre,isShow:false}))}>
        <MintMessage isMobile={matches}>
          <div>
            <img src={message?.isMf?'/images/home/popup/icon-park-solid_success.png':'/images/home/popup/fluent_error-circle-12-filled.png'} alt=''/>
          </div>
          <div className='cmcp h5-text-title'>{message?.isMf?'Congratulations! Mint code published.':'Mint failed'}</div>
          {
            !message?.isMf &&
            <div className={matches?'eds text-context16':'eds text-context14'}>Error detail: Submit request into has arror</div>
          }
          <div className='vmp text-context16' onClick={mesClick}>{message?.isMf?'View mint page':'Close'}</div>
        </MintMessage>
      </Modal>
    </div>
  )
}

export default React.memo(App)


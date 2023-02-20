/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import useAuth from 'hooks/useAuth'
import { Modal, message } from 'antd';
import styled from 'styled-components'; 
import { useWeb3React } from '@web3-react/core'
import './index.css'


const StyleBase = styled.div`
  .metaMaskC,.trustWalletc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-radius: 9px;
    padding: 3px 8px;
    background: #d8d8d8;
    border: none;
  }
  .metaMaskC {
    margin-top: 25px;
  }
  .metaMaskC:hover,.trustWalletc:hover {
    color: #FFFFFF;
    background: #9333EA;
  }
  .trustWalletc {
    margin-top: 12px;
    margin-bottom: 20px;
  }
  .ant-modal-content {
    background: #666;
  }
  .accountTxt {
    margin-top: 20px;
    color: #888;
    font-weight: 600;
    line-height: 1.5;
    font-size: 12px;    
    // display: flex;
    // justify-content: space-between;
    img {
      // position: absolute;
      // right: 20px;
      // top: 63px;
      width: 20px;
      height: 20px;
    }
  }
  .Logout:hover {
    background: #9333EA;
    color: #fff;
  }
  .Logout {    
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 0;
    border-radius: 20px;
    cursor: pointer;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-family: inherit;
    font-size: 14px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-letter-spacing: 0.03em;
    -moz-letter-spacing: 0.03em;
    -ms-letter-spacing: 0.03em;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    -webkit-transition: background-color 0.2s,opacity 0.2s;
    transition: background-color 0.2s,opacity 0.2s;
    height: 32px;
    padding: 0 16px;
    background-color: transparent;
    border: 2px solid;
    border-color: #9333EA;
    box-shadow: none;
    color: #9333EA;
    margin-top: 20px;
  }
`

const Index = (props: any) => {
  const [isLogout, setIsLogout] = useState(false);
  enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect",
    BSC = "bsc"
  }
  
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const connectorLocalStorageKey = "connectorId";
  const connectorId = window?.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const logoutOk = () => { 
    setIsLogout(false)
  }

  const logoutCancel = () => {
    setIsLogout(false)
  }

  const metaMask = () => { 
    window?.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected)
    login(ConnectorNames.Injected)
    props.setIsModalOpen(false);
  }

  const trustWallet = () => {
    window?.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.WalletConnect)
    login(ConnectorNames.WalletConnect)
    props.setIsModalOpen(false);
  }
  const linkUrl = (item) => {
    const address = item;// 拿到想要复制的值
    const copyInput = document.createElement('input');// 创建input元素
    document.body.appendChild(copyInput);// 向页面底部追加输入框
    copyInput.setAttribute('value', address);// 添加属性，将url赋值给input元素的value属性
    copyInput.select();// 选择input元素
    document.execCommand("Copy");// 执行复制命令
    message.success("Copied!");// 弹出提示信息，不同组件可能存在写法不同
    // 复制之后再删除元素，否则无法成功赋值
    copyInput.remove();// 删除动态创建的节点
  }

  return (
    <>
      <div onClick={()=> {
        if(account) {
          setIsLogout(true)
        } else {
          props.setIsModalOpen(true)
        }
      }}>
        {props.children}
      </div>
      <Modal className='walletModal' width={375} title="Connect a wallet" footer={null} open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <StyleBase>
          <div className='metaMaskC corsor-pointer' onClick={metaMask}>
            <span>Metamask</span><img style={{width: 32,height: 32}} src="/images/home/metamask.png" alt="" />
          </div>
          <div className='trustWalletc' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} onClick={trustWallet}>
            <span>WalletConnect</span><img style={{width: 32,height: 32}} src="/images/home/walletconnect.png" alt="" />
          </div>
        </StyleBase>
      </Modal>
      <Modal className='walletModal corsor-pointer' width={410} title="Your Address" footer={null} open={isLogout} onOk={logoutOk} onCancel={logoutCancel}>
        <StyleBase>
          <div className='accountTxt' onClick={() => { linkUrl(account) }}><span>{account}</span> <img src="/images/home/copy.png" alt="" /> </div>
          <div style={{textAlign: 'center'}}>
            <div className='Logout' onClick={() => { 
              logout()
              setIsLogout(false)
            }}>Logout</div>
          </div>
        </StyleBase>
      </Modal>
    </>
  );
};

export default Index;
/*
 * @Descripttion: 
 * @version: 
 * @Author: jun.wu
 * @Date: 2019-11-08 16:37:27
 * @LastEditors: jun.wu
 * @LastEditTime: 2019-11-18 17:43:26
 */
import React,{FC} from 'react';
import axios from 'axios';

import styles from './index.css';

const Page2 = () => {

  const  handleClick =() => {
    axios({
        url:'/api/login',
        method:"get"
    })
    }
    return (
        <>
            <span >页面22222</span>
            <span className={styles.name}>页面22222</span>
            <button onClick={handleClick}>点击获取请求</button>
        </>
    )
}

export default Page2;

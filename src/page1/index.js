import React,{FC} from 'react';

const Page1 = (props) => {
    console.log('测试是否可以通过',props)
    const {history} = props;
    const handleClickRouter =() => {
        history.push('/page2');
    }
    return (
        <>
            页面1
            <button onClick={handleClickRouter}>测试通过方法跳转路由</button>  
        </>
    )
}

export default Page1;
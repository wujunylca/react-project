import React,{PureComponent} from 'react';
import {hot} from 'react-hot-loader/root';
// import img1 from '@/assert/img.jpg';
// import img2 from '@/assert/img2.svg';
// import './App.css'

class AppDemo extends PureComponent {
    constructor(props){
        super(props)
        this.state ={
            name:'22'
        }
    }
    handleClick = () => {
        this.setState({name:'ffff'})
    }
    render() {
        return (
            <div className='page'>
                {/* 测试dxxxemosss,cheng
                局部更新{this.state.name}
                <button onClick={this.handleClick.bind(this)}>点击测试局部更新 </button>
                <img src={img1} />
                <img src={img2} /> */}
            </div>
        )
    }
}

export default  hot(AppDemo);

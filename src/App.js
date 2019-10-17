import React,{PureComponent} from 'react';
import {hot} from 'react-hot-loader/root';

class AppDemo extends PureComponent {
    constructor(props){
        super(props)
        this.state ={
            name:'22'
        }
    }
    handleClick (){
        this.setState({name:'ffff'})
    }
    render() {
        return (
            <div>
                测试demo,cheng
                局部更新{this.state.name}
                <button onClick={this.handleClick.bind(this)}>点击测试局部更新 </button>
            </div>
        )
    }
}

export default  hot(AppDemo);

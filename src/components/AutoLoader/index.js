import React,{PureComponent} from 'react';
import Loadable from 'react-loadable';

const LoadingStatus =(props) => {
    console.log('加载的状态',props)
}

// const LoaderComponent = (url) => Loadable({
//     loader:() => import(url),
//     loading:() => (<span>加载中------</span>),
//     delay:300
// });

// export default class LoaderComponent extends PureComponent {

//     const render
//     render() {
//         return (
//             <>

//             </>
//         )
//     }
// }

// export default LoaderComponent;

import React from 'react';
import Loadable from 'react-loadable';
import {HashRouter,Route,Switch,hashHistory} from 'react-router-dom';

// import {AutoLoader} from '@/components';

const LoadingStatus = ({ pastDelay, timedOut, error }) => {
    if (pastDelay) {
    return <div>loading</div>;
    } 
     if (timedOut) {
    return <div>Taking a long time...</div>;
    } 
     if (error) {
    return <div>Error!</div>;
    }
    return null;
   };

const Home = Loadable({
    loader:() => import('./page1/index'),
    loading:LoadingStatus
});
const Page2 = Loadable({
    loader:() => import('./page2/index'),
    loading:LoadingStatus
});

const BasicRoute =() => {
    return (
        <HashRouter history={hashHistory}>
            <Switch> 
                <Route exact path='/' component={Home} ></Route>
                <Route exact path='/page1' component={Home} ></Route>
                <Route exact path='/page2' component={Page2} ></Route>
            </Switch>
        </HashRouter>
    )
}

export default BasicRoute;

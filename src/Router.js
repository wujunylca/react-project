import React from 'react';
import {HashRouter,Route,Switch,hashHistory} from 'react-router-dom';

import Home from '@/page1';
import Page2 from '@/page2';

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

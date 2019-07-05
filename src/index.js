import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './routes'

import { domainToASCII } from 'url';

render(
    <Router>
        <Switch>
            <Route path='/admin' render={(routeProps) => {
                return <App {...routeProps}/>
            }}/>
            {
                mainRouter.map(route => {
                    return <Route keys={route.pathname} path={route.pathname} component={route.component}/>
                })
            }
            <Redirect to='/admin' from='/' exact />
            <Redirect to='/404' />
        </Switch>
    </Router>,
    document.querySelector('#root')
)


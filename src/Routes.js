import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import Chat from './containers/Chat';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ App }/>
                <Route path="/chat" component={ Chat }/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

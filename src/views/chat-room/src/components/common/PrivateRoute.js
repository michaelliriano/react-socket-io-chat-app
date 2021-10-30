import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const hasSocketId = () => {
    return !!localStorage.getItem('socketId')
}

const PrivateRoute = ({component: Component,socket, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            hasSocketId() ?
                <Component {...props } socket={socket} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
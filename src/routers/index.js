import React from 'react';
import Loadable from 'react-loadable';
const Loading = () => <div>Loading</div>;

const routerRender = {
    Home:Loadable({
        loader  :() => import('@COMPONENTS/Home'),
        loading :Loading
    }),
    Mouse:Loadable({
        loader  :() => import('@COMPONENTS/Mouse/MouseTracker'),
        loading :Loading
    }),
};

export default routerRender;

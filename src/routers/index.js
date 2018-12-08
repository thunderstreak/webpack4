import React from 'react';
import Loadable from 'react-loadable';
const Loading = () => <div>Loading</div>;

export default {
    Home:Loadable({
        loader  :() => import('@COMPONENTS/Home'),
        loading :Loading
    }),
    Mouse:Loadable({
        loader  :() => import('@COMPONENTS/Mouse/MouseTracker'),
        loading :Loading
    }),
    Bmap:Loadable({
        loader  :() => import('@COMPONENTS/Bmap'),
        loading :Loading
    }),
    unknownPage:Loadable({
        loader  :() => import('@COMPONENTS/404'),
        loading :Loading
    }),
    Login:Loadable({
        loader  :() => import('@COMPONENTS/Login'),
        loading :Loading
    }),
    Drag:Loadable({
        loader  :() => import('@COMPONENTS/Drag'),
        loading :Loading
    }),
    Clock:Loadable({
        loader  :() => import('@COMPONENTS/Clock'),
        loading :Loading
    }),
};


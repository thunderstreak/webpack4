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
};


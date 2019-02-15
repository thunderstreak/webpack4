import React from 'react';
import Loadable from 'react-loadable';

const Loading = ({isLoading, error}) => {
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export default {
    Home:Loadable({
        loader  :() => import('@COMPONENTS/SiderMenu'),
        loading :Loading,
        delay   : 300
    }),
    Mouse:Loadable({
        loader  :() => import('@COMPONENTS/Mouse/MouseTracker'),
        loading :Loading,
        delay   : 300
    }),
    Bmap:Loadable({
        loader  :() => import('@COMPONENTS/Bmap'),
        loading :Loading,
        delay   : 300
    }),
    unknownPage:Loadable({
        loader  :() => import('@COMPONENTS/404'),
        loading :Loading,
        delay   : 300
    }),
    Login:Loadable({
        loader  :() => import('@COMPONENTS/Login'),
        loading :Loading,
        delay   : 300
    }),
    Drag:Loadable({
        loader  :() => import('@COMPONENTS/Drag'),
        loading :Loading,
        delay   : 300
    }),
    Clock:Loadable({
        loader  :() => import('@COMPONENTS/Clock'),
        loading :Loading,
        delay   : 300
    }),
    StateAscension:Loadable({
        loader  :() => import('@COMPONENTS/StateAscension'),
        loading :Loading,
        delay   : 300
    }),
    ListFilter:Loadable({
        loader  :() => import('@COMPONENTS/ListFilter/FilterableProductTable'),
        loading :Loading,
        delay   : 300
    }),
    Themes:Loadable({
        loader  :() => import('@COMPONENTS/Themes'),
        loading :Loading,
        delay   : 300
    }),
    Portals:Loadable({
        loader  :() => import('@COMPONENTS/Portals'),
        loading :Loading,
        delay   : 300
    }),
    Redux:Loadable({
        loader  :() => import('@COMPONENTS/Redux'),
        loading :Loading,
        delay   : 300
    }),
    Authority:Loadable({
        loader  :() => import('@COMPONENTS/Authority'),
        loading :Loading,
        delay   : 300
    }),
    Poetry:Loadable({
        loader  :() => import('@COMPONENTS/Poetry'),
        loading :Loading,
        delay   : 300
    }),
    Nested:Loadable({
        loader  :() => import('@COMPONENTS/Nested'),
        loading :Loading,
        delay   : 300
    }),
    NestedRoute1:Loadable({
        loader  :() => import('@COMPONENTS/Nested/route1'),
        loading :Loading,
        delay   : 300
    }),
    NestedRoute2:Loadable({
        loader  :() => import('@COMPONENTS/Nested/route2'),
        loading :Loading,
        delay   : 300
    }),
    Saga:Loadable({
        loader  :() => import('@COMPONENTS/Saga'),
        loading :Loading,
        delay   : 300
    }),
    MultiRouter:Loadable({
        loader  :() => import('@COMPONENTS/MultiRouter'),
        loading :Loading,
        delay   : 300
    }),

};


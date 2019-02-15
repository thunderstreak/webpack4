import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import MultisPageAAA from './MultisPageA-A-A'
import MultisPageAAB from './MultisPageA-A-B'
import tools from '@TOOLS/utils'

export default function () {
    return (
        <div>
            MultisPageA-A
            <Switch>
                <Route path="/mulits/pageAA/pageAAA" component={MultisPageAAA} />
                <Route path="/mulits/pageAA/pageAAB" component={MultisPageAAB} />
                <Redirect from='/mulits/pageAA/' to='/mulits/pageAA/pageAAA' />
            </Switch>
            <span>{tools.getFibonacci(10)}</span>
        </div>
    )
}

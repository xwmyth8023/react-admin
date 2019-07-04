import React, { Component } from 'react'

import { Button } from 'antd'

const testHOC = (WrappedComponent) => {
    return class HOCComponent extends Component {
        render(){
            return(
                <>
                    <WrappedComponent />
                    <div>这是高阶组件</div>
                </>
            )
        }
    }
}

@testHOC
class App extends Component {
    render() {
        return (
            <div>
                app <Button type='primary'>AT</Button>
            </div>
        )
    }
}

export default App

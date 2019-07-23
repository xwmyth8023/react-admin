/**
 * react-lodabel 原理
 */

import React, { Component } from 'react'

const Loadable = ({loader,loading: Loading}) => {
    return class LodableComponent extends Component {
        state = {
            loadComponent:null
        }
        componentDidMount(){
            loader().then(result =>{
                this.setState({
                    loadComponent:result.default
                })
            })
        }
        render(){
            const { loadComponent } = this.state
            return 
                this.state.loadComponent
                ?
                <loadComponent />
                : 
                <Loading />
        }
    }
}

export default Loadable
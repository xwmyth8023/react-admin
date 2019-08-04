import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import logo from './logo.png'
import './frame.less'
// const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
    onClickMenu = ({key}) =>{
        this.props.history.push(key)
    }
    render() {
        const selectedKeyArry = this.props.location.pathname.split('/')
        selectedKeyArry.length=3
        return (
            <Layout style={{minHeight:'100%'}} > 
            <Header className="header admin-header" >
                <div className="admin-logo" >
                    <img src={logo} alt='admin-logo' />
                </div>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKeyArry.join('/')]}
                        onClick={this.onClickMenu}
                        style={{ height: '100%', borderRight: 0 }}
                    >   
                        {
                            this.props.menus.map(item => {
                                return (
                                    <Menu.Item key={item.pathname}>
                                        <Icon type={item.icon} />
                                        {item.title}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '8px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
            </Layout>
        )
    }
}

export default Frame

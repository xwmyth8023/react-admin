import React, { Component } from 'react'
import { Card,Button,Table } from 'antd'
import { getArticles } from '../../requests'

export default class ArticleList extends Component {
    constructor(){
      super()
      this.state = {
        dataSource: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: '操作',
            dataIndex: 'actions',
            key: 'actions',
            render: (text,record) => {
              return <Button>编辑</Button>
            }
          }
        ],
        total: 0
        
      }
    }
    createCloumns = (columnsKeys) => {
      return columnsKeys.map(item => {
        return {
          title: item,
          dataIndex: item,
          key: item
        }
      })
    }
    getDate = () => {
      getArticles()
        .then(resp => {
          const columnsKeys = Object.keys(resp.list[0])
          const columns = this.createCloumns(columnsKeys)
          this.setState({
            total: resp.total,
            dataSource: resp.list,
            columns
          })
        })
    }
    componentDidMount(){
      this.getDate()
    }
    render() {
        return (
            <div>
                <Card 
                  title="Articles List" 
                  bordered={false} 
                  extra={<Button>export excel</Button>}
                >
                  <Table 
                    columns={this.state.columns} 
                    dataSource={this.state.dataSource} 
                    pagination={{
                      total:this.state.total,
                      hideOnSinglePage: true
                    }} 
                    />
                </Card>
            </div>
        )
    }
}

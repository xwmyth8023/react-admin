import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd'
import { getArticles } from '../../requests'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group';

export default class ArticleList extends Component {
    constructor(){
      super()
      this.state = {
        dataSource: [],
        columns: [],
        total: 0,
        isLoading:false
      }
    }
    createCloumns = (columnsKeys) => {
      const columns = columnsKeys.map(item => {
        if(item ==='amount'){
          return {
            title: item,
            key: item,
            render: (text,record)=>{
              const { amount } = record
              return <Tag color={amount > 200 ? 'green' : 'red'}>{amount}</Tag>
            }
          }
        }
        if(item === 'createAt'){
          return {
            title:  item,
            key: item,
            render:(text,record)=>{
              const { createAt } = record
              return moment(createAt).format()
            }

          }
        }
        return {
          title: item,
          dataIndex: item,
          key: item
        }
      })
      columns.push({
        title:'action',
        key:'action',
        render(){
          return (
            <ButtonGroup>
              <Button size='small' type='primary' >编辑</Button>
              <Button size='small' type='danger' >删除</Button>
            </ButtonGroup>
          )
        }
      })
      return columns
    }
    getDate = () => {
      this.setState({
        isLoading:true
      })
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
        .catch(error => {
          //
        })
        .finally(()=>{
          this.setState({
            isLoading:false
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
                    loading={this.state.isLoading}
                    rowKey={record => record.id}
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

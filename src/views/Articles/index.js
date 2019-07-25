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
        isLoading: false,
        limited: 10,
        offset: 0
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

    getData = () => {
      this.setState({
        isLoading:true
      })
      getArticles(this.state.offset,this.state.limited)
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

    onPageChange = (page,pageSize) => {
      console.log('page:',page,'pageSize:',pageSize,'total:',page*pageSize)
      this.setState({
        offset: (page-1)*pageSize,
        limited: pageSize

      },()=>{
        this.getData()
      })
    }

    onShowSizeChange = (current,size) => {
      this.setState({
        offset: 0,
        limited: size

      },()=>{
        this.getData()
      })
    }

    componentDidMount(){
      this.getData()
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
                      current:this.state.offset / this.state.limited + 1,
                      total:this.state.total,
                      hideOnSinglePage: true,
                      showQuickJumper: true,
                      showSizeChanger:true,
                      onChange:this.onPageChange,
                      onShowSizeChange:this.onShowSizeChange,
                      pageSizeOptions:['10','15','20','25']
                    }} 
                    />
                </Card>
            </div>
        )
    }
}

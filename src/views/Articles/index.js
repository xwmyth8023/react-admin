import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, Typography, message, Tooltip } from 'antd'
import XLSX from 'xlsx'
import moment from 'moment'
import { getArticles, deleteArticle } from '../../requests'
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
        offset: 0,
        deleteArticleTitle: '',
        isShowArticleModal: null,
        deleteArticleConfirmLoading: false,
        deleteArticleID: null
      }
    }

    toEdit = (id) => {
      this.props.history.push(`/admin/article/edit/${id}`)
    }

    createCloumns = (columnsKeys) => {
      const columns = columnsKeys.map(item => {
        if(item ==='amount'){
          return {
            title: item,
            key: item,
            render: (text,record)=>{
              const { amount } = record
              return <Tooltip title={amount > 200 ? 'more than 200' : 'less than 200'} ><Tag color={amount > 200 ? 'green' : 'red'}>{amount}</Tag></Tooltip>      
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
        render:(text,record)=>{
          return (
            <ButtonGroup>
              <Button size='small' type='primary' onClick={this.toEdit.bind(this,record.id)} >编辑</Button>
              <Button size='small' type='danger' onClick={this.showDeleteArticleModal.bind(this,record)} >删除</Button>
            </ButtonGroup>
          )
        }
      })
      return columns
    }

    deleteArticleByID = () => {
      // console.log(this.state.deleteArticleID)
      this.setState({
        deleteArticleConfirmLoading: true
      })
      deleteArticle(this.state.deleteArticleID)
        .then(resp => {
          // console.log(resp)
          message.success(resp.msg)
          this.setState({
            offset:0
          },()=>{
            this.getData()
          })
        })
        .finally(()=>{
          this.setState({
            deleteArticleConfirmLoading: false,
            isShowArticleModal: false
          })
        })
    }

    showDeleteArticleModal = (record) =>{
      // console.log(record)
      // Modal.confirm({
      //   title: `确认删除${record.id}吗？`,
      //   content: '该操作不可逆，请谨慎！！!',
      //   onOk:()=>{
      //     deleteArticle(record.id)
      //       .then(resp => {
      //         console.log(resp)
      //       })
      //   }
      // })
      this.setState({
        isShowArticleModal: true,
        deleteArticleTitle: record.title,
        deleteArticleID: record.id
      })
    }

    hideDeleteModal = () => {
      this.setState({
        isShowArticleModal: false,
        deleteArticleTitle: '',
        deleteArticleConfirmLoading: false
      })
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
      // console.log('page:',page,'pageSize:',pageSize,'total:',page*pageSize)
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

    toExcel = () => {
      const data = [Object.keys(this.state.dataSource[0])]

      for (let i=0;i<this.state.dataSource.length;i++) {
        data.push([
          this.state.dataSource[i].id,
          this.state.dataSource[i].title,
          this.state.dataSource[i].author,
          this.state.dataSource[i].amount,
          moment(this.state.dataSource[i].createAt).format()
        ])
      }

      // console.log('export data to excel')
      const ws = XLSX.utils.aoa_to_sheet(data);
		  const wb = XLSX.utils.book_new();
		  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		  /* generate XLSX file and send to client */
		  XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format()}.xlsx`)
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
                  extra={ <Button onClick={this.toExcel} >export excel</Button> }
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
                <Modal
                  title='此操作不可逆'
                  visible={this.state.isShowArticleModal}
                  onCancel={this.hideDeleteModal}
                  confirmLoading={this.state.deleteArticleConfirmLoading}
                  maskClosable={false}
                  onOk={this.deleteArticleByID}
                >
                  <Typography>确定要删除<span>{this.state.deleteArticleTitle}</span>吗？</Typography>
                </Modal>
            </div>
        )
    }
}

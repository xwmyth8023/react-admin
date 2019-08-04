import React, { Component } from 'react'
import { Card, Button } from 'antd'

export default class Edit extends Component {
    render() {
        return (
          <Card 
          title="Articles List" 
          bordered={false} 
          extra={ <Button>cancel</Button> }
          >
            文章内容
          </Card>
        )
    }
}

import  React, { PureComponent } from 'react';
// import { Link } from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin'
import {  Menu } from 'antd';
import './style.less'

// const SubMenu = Menu.SubMenu;

class Category extends PureComponent{
    handleDiffPage(e) {
        this.props.changePage(e)
    }
    render(){
      const textStyle = {
        fontSize: "16px",
        lineHeight: "64px",
      }
        return(
            <Menu id='category_container' style={textStyle} mode='horizontal'
                onClick={e => { this.handleDiffPage(e)} } 
                selectedKeys={[this.props.current]} 
                theme='light'>
                  <Menu.Item key='ana'>舆情监测</Menu.Item>
                  <Menu.Item key='handle'>舆情处置</Menu.Item>
                  <Menu.Item key='special'>专题事件</Menu.Item>
                  <Menu.Item key='topic'>专贴分析</Menu.Item>
            </Menu>

        )
    }
}

export default Category;
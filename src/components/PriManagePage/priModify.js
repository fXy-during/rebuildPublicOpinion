import React, { PureComponent } from "react";
// import { Link } from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Table, Breadcrumb, Popconfirm } from "antd";

const { Column } = Table;

class PriModify extends PureComponent {
  componentDidMount() {
    // 挂载
  }
  // 更改权限
  changePri(text) {
    this.props.changeRoleAciton(text);
  }
  // 刪除用户
  confirmText(text) {
    this.props.deleteUserAction(text);
  }
  cancel(e) {
    console.log(e);
  }
  render() {
    return (
      <Table dataSource={this.props.userList} pagination={{ pageSize: 6 }}>
        <Column title="用户名" dataIndex="username" key="username" width="74" />
        <Column title="密码" dataIndex="password" key="password" />
        <Column title="权限" dataIndex="role" key="role" />
        <Column
          title="操作"
          key="action"
          render={(text, record, index) => (
            <Breadcrumb>
              <Breadcrumb.Item>
                <span
                  onClick={e => {
                    this.changePri(text);
                  }}
                >
                  更变权限
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Popconfirm
                  title="Are you sure delete this user?"
                  onConfirm={e => {
                    this.confirmText(text);
                  }}
                  onCancel={this.cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <span>删除用户</span>
                </Popconfirm>
              </Breadcrumb.Item>
            </Breadcrumb>
          )}
        />
      </Table>
    );
  }
}

export default PriModify;

// <Transfer
//            titles={['普通用户', '特权用户']}
//            dataSource={this.state.mockData }
//            targetKeys={this.state.targetKeys}
//            render={item => {this.renderItem(item)} }
//            >

//            </Transfer>

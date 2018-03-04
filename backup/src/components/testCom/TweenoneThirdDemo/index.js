import React from 'react';
import { Table, Button} from 'antd';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import { TweenOneGroup } from 'rc-tween-one';

class TableEnterLeave extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
          <span onClick={e => this.onDelete(record.key, e)}>
          Delete
        </span>),
      },
    ];

    this.enterAnim = [
      { opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0 },
      {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd,
      },
      { opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad' },
      { delay: 1000, backgroundColor: '#fff' },
    ];

    this.leaveAnim = [
      { duration: 250, opacity: 0 },
      { height: 0, duration: 200, ease: 'easeOutQuad' },
    ];

    this.data = [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No.1 Lake Park',
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No.1 Lake Park',
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No.1 Lake Park',
      },
      {
        key: 4,
        name: 'Jim Red',
        age: 18,
        address: 'London No.1 Lake Park',
      },
    ];
    this.currentPage = 1;
    this.newPage = 1;

    this.state = {
      data: this.data,
    };
  }


  onEnd(e) {
    const dom = e.target;
    dom.style.height = 'auto';
  }

  onAdd() {
    const data = this.state.data;
    const i = Math.round(Math.random() * (this.data.length - 1));
    data.unshift({
      key: Date.now(),
      name: this.data[i].name,
      age: this.data[i].age,
      address: this.data[i].address,
    });
    this.setState({
      data,
    });
  };

  onDelete(key, e) {
    e.preventDefault();
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({ data });
  }

  getBodyWrapper(body) {
    // 切换分页去除动画;
    if (this.currentPage !== this.newPage) {
      this.currentPage = this.newPage;
      return body;
    }
    return (<TweenOneGroup
      component="tbody"
      className={body.props.className}
      enter={this.enterAnim}
      leave={this.leaveAnim}
      appear={false}
    >
      {body.props.children}
    </TweenOneGroup>);
  }

  pageChange(pagination) {
    this.newPage = pagination.current;
  };

  render() {
    return (<div>
      <div >
        <div >
          <div >
            <ul>
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
          <div >
            <span>
              <img
                height="24" src="https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg"/>
              <img
                height="14" src="https://zos.alipayobjects.com/rmsportal/bNfCyCcgnyTgRmz.svg"/>
            </span>
          </div>
          <div >
            <QueueAnim type="bottom" component="ul">
              <li key="0" />
              <li key="1" />
              <li key="2" />
              <li key="3" />
              <li key="4" />
            </QueueAnim>
          </div>
          <div >
            <div >
              <Button type="primary" onClick={this.onAdd.bind(this)}>Add</Button>
            </div>
            <Table
              columns={this.columns}
              pagination={{ pageSize: 4 }}
              dataSource={this.state.data}
              getBodyWrapper={this.getBodyWrapper.bind(this)}
              onChange={this.pageChange.bind(this)}
            />
          </div>
        </div>
      </div>
    </div>);
  }
}

  // const propTypes = {
  //   className: PropTypes.string,
  // };

  // const defaultProps = {
  //   className: 'table-enter-leave-demo',
  // };
// TableEnterLeave.propTypes = {
//     className: PropTypes.string
// }
// TableEnterLeave.defaultProps = {
//     className: 'table-enter-leave-demo'
// }
export default TableEnterLeave;
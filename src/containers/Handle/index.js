import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../Head";
import DataExhibition from "../DataExhibition";
// import { Button } from 'antd';
// import getMockData from '../../fetch/easyMockTest';

// import TestDemoTweenFirst from '../../components/testCom/TweenOne-FirstDemo';

import * as userInfoActionsFromOtherFile from "../../actions/userinfo.js";

import HandleDataList from "../DataList/handleList";

class Handle extends PureComponent {
  componentDidMount() {}
  // handleMockTest() {
  //     let result = getMockData();
  //     result.then(resp => {
  //         if (resp.ok) {
  //             return resp.json();
  //         }
  //     }).then(json => {
  //         console.log('mock data', json);
  //     })
  // }
  render() {
    if (!this.props.userinfo.username) {
      // 判断用户登录情况
      return <Redirect to="/" />;
    }
    // const { role, username } = this.props.userinfo;
    // console.log('this.props.userinfo', this.props.userinfo);
    const userinfo = this.props.userinfo;
    const { role, username } = userinfo;
    // console.log('username',username);

    return (
      <div>
        <Header
          history={this.props.history}
          user={username}
          role={role}
          selectedKeys="handle"
        />{" "}
        {/* 头部 */}
        <DataExhibition
          tableType="handledEvent"
          token={this.props.userinfo.token}
        />{" "}
        {/* 图表 */}
        <HandleDataList
          token={this.props.userinfo.token}
          user={username}
        />{" "}
        {/*  列表展示  */}
      </div>
    );
  }
}
// <TestDemoTweenFirst />  动画测试
// <DailyDataList token={this.props.userinfo.token} user= { username }/>  { /*  列表展示  */}
// <DataExhibition tableType='dailyEvent' token={this.props.userinfo.token}/>  { /* 图表 */}
// easy mock test
// <Button onClick={ this.handleMockTest }> Click me to get mock data </Button>

// 连接redux

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoAction: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Handle);

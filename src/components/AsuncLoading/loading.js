import React from "react";
import { Spin } from "antd";
const loadingComponent = props => {
  // console.log("props", props);
  if (props.error) {
    // 加载失败
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    // 在阀值之上显示
    return (
      <div>
        <Spin />
      </div>
    );
  } else if (props.timedOut) {
    // 超时
    return <div>Taking a long time...</div>;
  } else {
    return null;
  }
};

export default loadingComponent;

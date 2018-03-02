import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./style.less";
class NotFound extends PureComponent {
  render() {
    return (
      <div>
        404
        <p>别乱来`</p>
        <Link to="/"> Back Home</Link>
        <br />
      </div>
    );
  }
}

export default NotFound;

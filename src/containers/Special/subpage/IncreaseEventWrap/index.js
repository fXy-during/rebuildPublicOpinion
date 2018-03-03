import React, { PureComponent } from "react";
import { Form, Icon, Input, Button, message } from "antd";

import TagInput from "../../../../components/TagInput";

import addSpecial from "../../../../fetch/addSpecial";
import "./style.less";
const FormItem = Form.Item;

class IncreaseEventWrap extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topicName: "",
      region: ["西南石油大学"],
      rules: [],
      regionDone: false,
      rulesDone: false
    };
  }
  handleCancel() {
    this.props.onCancle();
  }

  // 子表格归集
  handleOk() {
    // this.props.onAdd();
    let topicName = this.props.form.getFieldValue("name");
    this.setState({ topicName });
    let { region, rules } = this.state;
    let { token, afterAdd, onCancle } = this.props;
    if (!topicName || !region || !rules) {
      message.error("input null");
      return;
    }
    let result = addSpecial({ id: 0, name: topicName, region, rules }, token);
    result
      .then(resp => {
        if (resp.ok) {
          return resp.text();
        }
      })
      .then(text => {
        message.success(text);
        afterAdd();
        onCancle();
      });
  }
  handleGetRegionAction(region) {
    this.setState({ region });
    console.log("父组件得到的region", region);
  }
  handleGetRulesAction(rules) {
    this.setState({ rules });
    console.log("父组件得到的rules", rules);
  }
  onChangeInputStyleRegion(regionDone) {
    this.setState({ regionDone });
  }
  onChangeInputStyleRules(rulesDone) {
    this.setState({ rulesDone });
  }
  render() {
    const {
      getFieldDecorator,
    } = this.props.form;
    const { rulesDone, regionDone } = this.state;
    return (
      <div>
        <Form>
          <FormItem label="专题名">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input topic name!" }]
            })(
              <Input
                prefix={<Icon type="tag" style={{ fontSize: 13 }} />}
                placeholder="topic name"
              />
            )}
          </FormItem>
          <FormItem label="地域">
            {getFieldDecorator("region", {
              rules: [{ required: true, message: "Please input topic name!" }]
            })(
              <TagInput
                tagColor="#108ee9"
                iconStyle="environment"
                onChangeInputStyle={this.onChangeInputStyleRegion.bind(this)}
                handlePopValue={this.handleGetRegionAction.bind(this)}
                initTags={["西南石油大学"]}
              />
            )}
          </FormItem>
          <FormItem label="关键字">
            {getFieldDecorator("rules", {
              rules: [{ required: true, message: "Please input topic name!" }]
            })(
              <TagInput
                tagColor="#f50"
                iconStyle="key"
                onChangeInputStyle={this.onChangeInputStyleRules.bind(this)}
                handlePopValue={this.handleGetRulesAction.bind(this)}
              />
            )}
          </FormItem>
        </Form>
        <p className="modal-foot-btn-container">
          <Button key="back" onClick={this.handleCancel.bind(this)}>
            取消
          </Button>,
          <Button
            disabled={!rulesDone || !regionDone}
            title="Make sure you have clicked the check button"
            key="submit"
            type="primary"
            onClick={this.handleOk.bind(this)}
          >
            添加
          </Button>
        </p>
      </div>
    );
  }
}
const IncreaseEvent = Form.create()(IncreaseEventWrap);
export default IncreaseEvent;

import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Form, Icon, Input, Button, message, Modal  } from 'antd';

import TagInput from '../../../../components/TagInput';

import addTopic from '../../../../fetch/addTopic';
const FormItem = Form.Item;
import './style.less';

let uuid = 1;
class IncreaseTopic extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

  }
  componentDidMount() {
    const { form } = this.props;
    // 初始一个输入框
    form.setFieldsValue({
      keys: [1]
    })
  }
  remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  
  add(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.onAdd(values);
      }
    });
  }
  // 输入验证
  checkValueValid(rule, value, callback) {
    let reg = /\d{10}/;
    if(!value || !reg.test(value)) {
      callback('请输入正确的数字贴子ID');
    } else {
      callback()
    }
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    // console.log('keys:', keys);
    //  help="请输入正确的贴子ID"
          // validateStatus='error'
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Urls' : ''}
          required={false}
          key={k}
         
        >
          {getFieldDecorator(`url-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            
            rules: [{
              whitespace: true,
              message: "Please input a valid url.",
              validator: this.checkValueValid.bind(this)
            }],
          })(
            <Input  addonBefore="http://tieba.baidu.com/p/" 
             placeholder="ID" 
             style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}/>
          ) : null}
        </FormItem>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem {...formItemLayout}
          label="Topic"
          >
          {getFieldDecorator("topicName", {
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input a name.",
            }],
          })(
            <Input 
             placeholder="Name" 
             style={{ width: '60%', marginRight: 8 }} />
          )}
          
        </FormItem>

        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const IncreaseTopicWrap = Form.create()(IncreaseTopic);
export default IncreaseTopicWrap;
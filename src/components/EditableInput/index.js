/* 
* @Author: fxy
* @Date:   2017-09-12 13:33:18
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-02 20:01:03
*/

import  React, { PureComponent } from 'react';
import { Input, Icon  } from 'antd'

import './style.less';

class EditableInput extends PureComponent{
    constructor(props, context){
        super(props, context);
        this.state = {
            value: " ",
            ediable: false
        }
    }
    handleChange(e) {
        const value = e.target.value;
        // console.log('value', value);
        this.setState({value})
    }
    check() {
        this.setState({ediable: false});
        if (!!this.props.onChange) {
          this.props.onChange(this.state.value);
        }
    }
    edit() {
        this.setState({ediable: true})
    }
    componentWillMount() {  
        this.setState({
            value: this.props.value
        })
    }
    // componentDidUpdate() {
    //     this.setState({
    //         value: this.props.value
    //     })
    // }
    componentWillUpdate(nextProps, nextState) {   
        // console.log('nextProps', nextProps, 'nextState', nextState );
        if(nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value,
                ediable: false
            })
        }
    }
    render(){
        const { value, ediable } = this.state;
        return(
        <div className='editable-cell'>
            {
                ediable?
                <div className='editable-cell-input-wrapper'>
                    <Input 
                    value={value}
                    className='editable-input'
                    onChange={this.handleChange.bind(this)} 
                    onPressEnter={this.check.bind(this)} />
                    <Icon type='check' className='editable-cell-icon-check' onClick={this.check.bind(this)} />
                </div>
                :
                <div className='editable-cell-text-wrapper'>
                { value || '' }
                <Icon type='edit' className='editable-cell-icon editable-cell-icon-check' onClick={this.edit.bind(this)} />
                </div>
            }
        </div>
        )
    }
}

export default EditableInput;
import React from 'react';
import { connect } from 'react-redux'
import { auth } from '../firebase';
//style
import { Form, Input, Button, } from 'antd';
const FormItem = Form.Item;



class Account extends React.Component {

    state = {
        confirmDirty: false,
        error: false,
        errorMessage: ""
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            auth.doPasswordUpdate(values.password)
                .catch(error => {

                    if (!error) {
                        //TODO  create popup 'pw changed success' 
                    }
                    console.log("error from doSignInWithEmailAndPassword  : ", error);
                })
                .then(this.props.form.resetFields())
            // .then(this.props.history.push('/account'));
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <h1>hello {this.props.user.name} this is your account</h1>
                <Form onSubmit={this.handleSubmit} className="change-password-form">
                    <h2>Change your password</h2>
                    <h1>{this.state.error ? this.state.errorMessage : ""}</h1>
                    <FormItem
                        {...formItemLayout}
                        label="New Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }, {
                                min: 6
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">submit</Button>
                    </FormItem>
                </Form>
                

                <h2>TODO:</h2>
                <h3>Update UserName</h3>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const FormWrappedAccount = Form.create()(Account);
export default connect(mapStateToProps)(FormWrappedAccount)
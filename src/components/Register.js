import React from 'react';
import { auth, db } from '../firebase';
// import { firebase } from '../firebase';
import { connect } from 'react-redux'

//style
import { Form, Input, Tooltip, Icon, Checkbox, Button, } from 'antd';
const FormItem = Form.Item;

class Register extends React.Component {


    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.user.loggedIn !== prevProps.user.loggedIn) {
            this.props.history.push('/')
        }
    }

    registerUser = (values) => {

        const email = values.email
        const password = values.password
        const username = values.username.substr(0, 1).toUpperCase() + values.username.substr(1);


                    // let nameFromEmail = user.email.substring(0, user.email.indexOf("@"));
                    // nameFromEmail = nameFromEmail

        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                console.log("authUser = ", authUser);
                db.doCreateUser(authUser.user.uid, username, email)

                
                authUser.user.updateProfile({
                    displayName: values.username,
                }).then(function () {
                    // Email sent.
                    console.log('display name updated sent')
                    authUser.user.sendEmailVerification().then(function () {
                        // Email sent.
                        console.log('email verification sent sent');

                    }).catch(function (error) {
                        // An error happened.
                        console.log("email error : ", error);
                    });
                }).catch(function (error) {
                    // An error happened.
                    console.log("update user error : ", error);
                });


            }).catch(error => {
                console.log("error from doCreateUserWithEmailAndPassword = ", error);
            })


        // user.updateProfile({
        //     displayName: nameFromEmail,
        // }).then(function () {
        //     // Email sent.
        //     console.log('display name updated sent');
        // }).catch(function (error) {
        //     // An error happened.
        //     console.log("update user error : ", error);
        // });
    }

    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.registerUser(values, (error) => {
                    if (error) {
                        console.log("there's an error : ", error);
                    } else {
                        this.props.form.resetFields()
                        this.props.history.push('/home')
                    }
                })
            }
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
            <Form onSubmit={this.handleSubmit} className="registration-form">
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Name&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="Password"
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
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(Register);

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(WrappedRegistrationForm)
import React from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;



class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                const email = values.email
                const password = values.password

                auth.doSignInWithEmailAndPassword(email, password).catch(error => {
                    console.log("error from doSignInWithEmailAndPassword  : ", error);
                })
                    
                .then(this.props.form.resetFields())
                .then(this.props.history.push('/account'));

            }
        });


    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (



            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem >
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your E-mail!', }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Link to="/forgot" className="login-form-forgot" >Forgot password</Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>

        );
    }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin
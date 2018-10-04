import React from 'react';
import { auth } from '../firebase';

import { Form, Icon, Input, Button, Modal } from 'antd';

const FormItem = Form.Item;



class Forgot extends React.Component {

    state = {
        error: false,
        errorMessage: "dwfewfefeq",
        popUp: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.history.push('/register')
       
    }


    errorPopUp = () => {

        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
        });
    }



    handleSubmit = (e) => {

        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                const email = values.email

                auth.doPasswordReset(email).catch(error => {
                    console.log("error from doPasswordReset  : ", error);

                    if (error) {
                        if (error.code === 'auth/user-not-found') {
                            console.log('THERE IS NO USER OF THAT NAME');
                            this.setState({
                                ...this.state,
                                error: true,
                                errorMessage: `${values.email}  is not a regoistered account, try and register ✌️`,
                                popUp: true
                            })
                            this.props.form.resetFields()
                        }
                    }
                })
                // .then(this.props.history.push('/home'));

            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (


            <Form onSubmit={this.handleSubmit} className="forgot-form">
                <h3>enter email and we will send you a password reset</h3>


                {/* <h2>{this.state.error ? this.errorPopUp() : ""}</h2> */}


                <Modal
                    visible={this.state.popUp}
                    onOk={this.handleOk}
                    // onCancel={this.handleCancel}
                >
                    {this.state.errorMessage}

                </Modal>

                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Email" />
                    )}
                </FormItem>

                <Button type="primary" htmlType="submit" className="login-form-button">submit</Button>
            </Form>

        );
    }
}

const WrappedForgot = Form.create()(Forgot);
export default WrappedForgot
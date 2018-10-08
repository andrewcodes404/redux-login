import React from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {

    state = {
        error: false,
        errorMessage: "",
        popUp: false
    };


    /*Check to see if the redux reducer 
    has changed the user prop 
    BEFORE sending to hompage*/
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.user.loggedIn !== prevProps.user.loggedIn) {
            this.props.history.push('/')
        }
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            popUp: false

        });
      
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            popUp: false
        });
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
                const password = values.password

                auth.doSignInWithEmailAndPassword(email, password)

                    // this happens when the promise is fufilled ie lgin is successful
                    .then(() => {
                        // this.props.history.push('/')
                        console.log('the promise returns!')
                    })

                    // this is catching the errors
                    .catch(error => {
                        if (error) {
                            let errorMessage = 'login error'

                            if (error.code === 'auth/user-not-found') {
                                errorMessage = `${values.email}  is not a registered account, try and register ✌️`
                            } else if (error.code === 'auth/wrong-password' || 'auth/user-not-found') {
                                errorMessage = 'wrong username or password '
                            } else if (error.code === 'auth/user-disabled') {
                                errorMessage = 'account disabled please contact admin'
                            }

                            this.setState({
                                ...this.state,
                                error: true,
                                errorMessage: errorMessage,
                                popUp: true
                            })

                        }

                    })



                // .then(()=>{
                //     // console.log("firebase.auth().currentUser : ", firebase.auth().currentUser);
                //     // console.log('THE THEN WITH FN');
                //     // console.log("this.props.user : ", this.props.user);
                //     // if (this.props.user.loggedIn) {
                //     //     this.props.history.push('/')
                //     // }
                // })

            }
        })
    }


    // this.props.form.resetFields()
    // this.props.history.push('/account')

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log("FROM LOGIN this.props.user : ", this.props.user);

        return (

            <div>

                <Modal
                    visible={this.state.popUp}
                    // onOk={this.handleOk}
                    okText={"register"}
                    onCancel={this.handleCancel}
                    // onCancel={this.handleCancel}
                    footer={[<Button key="ok" onClick={this.handleOk}> okay xx </Button>]}
                >{this.state.errorMessage} </Modal>



                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, { required: true, message: 'Please input your E-mail!', }],
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

            </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const WrappedLogin = Form.create()(Login);

export default connect(mapStateToProps)(WrappedLogin)
import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter  } from 'react-router-dom'
import { auth } from '../firebase';
import { Menu, Icon, Button } from 'antd';

const LoggedIn = (props) => (
    <div>
        <Menu mode="horizontal" style={{ marginBottom: "2rem" }}>
            <Menu.Item>
                <Link to="/home" className="mr2"> <Icon type="home" />home</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/account" className="mr2"><Icon type="user" />account - {props.user}</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/upload" className="mr2"><Icon type="upload" />upload</Link>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={props.logOut}>Log Out</Button>
            </Menu.Item>
        </Menu>

    </div>
);

const LoggedOut = () => (
    <div>
        <Menu mode="horizontal">
            <Menu.Item>
                <Link to="/home" className="mr2"> <Icon type="home" />home</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/login" className="mr2"><Icon type="login" />register or login</Link>
            </Menu.Item>
        </Menu>
    </div>
)

class Navigation extends React.Component {

    logOut = () => {
        auth.doSignOut().then(() => {
            this.props.history.push('/')
        }
        );
    }

    render() {

        return (
            <div>
                {this.props.user.loggedIn ? < LoggedIn logOut={this.logOut} user={this.props.user.name} /> : LoggedOut()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const NavWrappedWithRouter = withRouter(Navigation)
export default (connect(mapStateToProps)(NavWrappedWithRouter))
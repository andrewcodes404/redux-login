import React from 'react';

//Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Redux
import { connect } from 'react-redux'
import { logInAC, logOutAC } from '../actions'

//Firebase
import { db } from '../firebase';
import { firebase } from '../firebase';




//Pages
import Nav from './Nav';

import Forgot from "./Forgot";
import Account from "./Account";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";


class App extends React.Component {

    componentDidMount() {

        //Check if user is logged in, a fn where we can check if the object is true
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                //grab the user uid
                const id = user.uid;
                //with the authenticated ID we can acces that users data from the db and send it to the redux store    
                db.onceGetUser(id).then((snapshot) => {
                    this.props.logInAC(snapshot.val())
                })
                // if not call the LogoutAC to blank the store    
            } else {
                this.props.logOutAC()
            }
        });
    }


    render() {
        console.log("FROM App.js this.props.user = ", this.props.user);
        return (
            <BrowserRouter>
                <div>
                    <Nav />
                    <div className="page-wrapper">
                        <Switch>
                            <Route path="/forgot" component={Forgot} />
                            <Route exact path="/account" component={Account} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route path="/" component={Home} />

                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logInAC, logOutAC })(App)
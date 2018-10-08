import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Home extends React.Component {

    renderUserContent = () => {
        const { userContent, name } = this.props.user
        return (
            <div>
                <h1>Hi {name}</h1>
                {userContent.map((el, index) => {
                    function createMarkup() { return { __html: el.text } }
                    return (
                        <div key={index} >
                            <h2>Post {index + 1}</h2>
                            <div dangerouslySetInnerHTML={createMarkup()}></div>
                            <br />
                            <br />nbsp;
                    </div>
                    )
                }
                )}
            </div>
        )
    }


    renderHomePage = () => (
        <div>
            <h1>Hi this is the home page</h1>
            <p>you are not logged in do that <Link to="/login">here</Link></p>
            <p>or register <Link to="/register"> here</Link></p>
        </div>
    )



    render() {
        return (
            <div>
                {this.props.user.loggedIn ? this.renderUserContent() : this.renderHomePage()}


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Home)
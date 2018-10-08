import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux'
import { uploadUserContentAC } from '../actions'
import { db } from '../firebase';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }, { 'font': ['Ubuntu', 'Raleway', 'Roboto'] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'font'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ]
}


class Upload extends React.Component {

    constructor(props) {
        super(props)
        this.state = { text: '', title: "" }
    }

    handleChange = (value) => {
        this.setState({ text: value })
    }


    handleSubmit = () => {
        const content = this.state.text
        const uid = this.props.user.id
        db.setUserContent(uid, content)

// TODO: catch errors and clear form after sending  redirect to account

        // uploadUserContentAC(values, (id) => {
        //     this.setState({ text: "", title: "" })
        //     this.props.history.push('/single/' + id);
        // })
    }

    render() {
console.log("this.props.user : ", this.props.user);

        return (
            <div>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.handleChange}
                    modules={modules}
                />

                <button onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { uploadUserContentAC })(Upload)
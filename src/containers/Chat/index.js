import React, { Component } from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            name: ''
        };
    }
    componentDidMount() {
        this.props.startChatChannel();
    }

    onChangeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit(event) {
        event.preventDefault();
        this.props.sendMessageHandler(this.state);
        this.setState({ message: '' });
    }

    render() {

        return (
            <div style={{ textAlign: 'center' }}>
                <Header />
                <form>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={ event => this.onChangeHandler(event)}></input>
                    <br/>
                    <label>Message:</label>
                    <input type="text" name="message" onChange={ event => this.onChangeHandler(event)}></input>
                    <button type="button" onClick={ event => this.submit(event) }>Send message</button>
                </form>
                <h2>Messages</h2>
                { this.props.messages.length > 0 &&
                    this.props.messages.map((message, index) => {

                        return <div key={index}><div>Name: {message.name}</div><div>Message: {message.message}</div></div>
                    })
                }
            </div>
        );
    }
}

Chat.propTypes = {
    startChatChannel: PropTypes.func,
    sendMessageHandler: PropTypes.func,
    messages: PropTypes.array
}

const mapStateToProps = state => {
    return {
        messages: state.chat.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startChatChannel: () => {
            return dispatch({ type: 'LISTEN_TO_CHAT' })
        },
        sendMessageHandler: message => {
            return dispatch({ type: 'SEND_MESSAGE', message })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

import React, { Component } from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from '../../components/Message';

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
            <div className="container">
                <Header />
                <form>
                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-control" type="text" name="name" onChange={ event => this.onChangeHandler(event)}></input>
                    </div>
                    <div className="form-group">
                        <label>Message:</label>
                        <input className="form-control" type="text" name="message" onChange={ event => this.onChangeHandler(event)}></input>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={ event => this.submit(event) }>Send message</button>
                </form>
                <h2>Messages</h2>
                { this.props.messages.length > 0 &&
                    this.props.messages.map((message, index) => {

                        return <Message key={index} name={ message.name } message={ message.message } />
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

import React from 'react';
import PropTypes from 'prop-types';

function Message(props) {
    return (
        <div className="alert alert-success">
            <div>Name: {props.name}</div>
            <div>Message: {props.message}</div>
        </div>
    )
}

Message.propTypes = {
    name: PropTypes.string,
    message: PropTypes.string
}

export default Message;

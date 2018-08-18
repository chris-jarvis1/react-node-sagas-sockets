import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/chat">Chat</Link>
                </div>
            </div>
        );
    }
}

export default Header;

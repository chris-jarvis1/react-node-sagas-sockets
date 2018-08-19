import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <nav className="navbar navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <Link className="navbar-brand" to="/chat">Chat</Link>
                </nav>
            </div>
        );
    }
}

export default Header;

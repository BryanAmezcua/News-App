import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.scss';

const ErrorPage = (props) => {
    let redirect_text, redirect_link = '';

    localStorage.getItem('loggedIn') === 'true' ? redirect_text = 'Back to Home' : redirect_text = 'Back to Sign In';
    localStorage.getItem('loggedIn') === 'true' ? redirect_link = '/home' : redirect_link = '/';

    return (
        <React.Fragment>
            <div className="gandalf">
                <div className="fireball"></div>
                <div className="skirt"></div>
                <div className="sleeves"></div>
                <div className="shoulders">
                    <div className="hand left"></div>
                    <div className="hand right"></div>
                </div>
                <div className="head">
                    <div className="hair"></div>
                    <div className="beard"></div>
                </div>
            </div>
            <div className="message">
                <h1>403 - You Shall Not Pass</h1>
                <p>Uh oh, Gandalf is blocking the way!<br/>Maybe you have a typo in the url? Or you meant to go to a different location?</p>
                <p><Link to={redirect_link}>{redirect_text}</Link></p>
            </div>
        </React.Fragment>
    );
};

export default ErrorPage;
import React from 'react';

//Animation
import Grow from '@material-ui/core/Grow';

export default function Profile(props) {
    return (
        <Grow in={true} timeoout={650}>
            <div>
                <h3>Testing</h3>
            </div>
        </Grow>
    );
};
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Input from '../input/';

import { userUpdateRequested } from '../../ducks/side-effects/user/';

import './user-input-style.css';

const UserInput = (props) => (
    <div className="user-input">
        <Input
            autoComplete="on"
            autoFocus
            name="userName"
            placeholder="Username"
            onChange={props.userUpdateRequested}
        />
    </div>
);

const mapDispatchToProps = {
    userUpdateRequested
};

UserInput.propTypes = {
    userUpdateRequested: PropTypes.func
};

export { UserInput as UserInputPure };
export default connect(null, mapDispatchToProps)(UserInput);

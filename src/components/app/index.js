import React from 'react';
import UserInput from '../user-input/';
import UserRepos from '../user-repos/';

import './reset.css';
import './app-style.css';

const App = () => (
    <div className="container">
        <div className="container__input">
            <UserInput />
        </div>
        <div className="container__list">
            <UserRepos />
        </div>
    </div>
);

export default App;

import React, { PropTypes } from 'react';

import UserRepoItem from '../user-repo-item/';

import './user-repo-list-style.css';

const UserRepoList = (props) => (
    <ul className="user-repo-list">
        {
            props.repos.map(repo =>
                <UserRepoItem {...repo} key={repo.id} />
            )
        }
    </ul>
);

UserRepoList.propTypes = {
    repos: PropTypes.array
};

export default UserRepoList;

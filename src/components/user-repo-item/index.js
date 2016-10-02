import React, { PropTypes } from 'react';

import './user-repo-item-style.css';

const UserRepoItem = (props) => (
    <li className="user-repo-item">
        <a
            className="user-repo-item__link"
            href={props.svn_url}
            rel="noopener noreferrer"
            target="_blank"
        >
            <p className="user-repo-item__name">
                {props.name}
            </p>
            <div className="user-repo-item__stats">
                <span className="user-repo-item__stars">
                    {
                        `stars: ${props.stargazers_count}`
                    }
                </span>
                <span className="user-repo-item__issues">
                    {
                        `issues: ${props.open_issues_count}`
                    }
                </span>
            </div>
        </a>
    </li>
);

UserRepoItem.propTypes = {
    name: PropTypes.string,
    svn_url: PropTypes.string,
    stargazers_count: PropTypes.number,
    open_issues_count: PropTypes.number
};

export default UserRepoItem;

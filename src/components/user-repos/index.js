import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import UserRepoList from '../user-repo-list/';
import Spinner from '../spinner/';
import { userDataSelector } from '../../ducks/pure/user/';

import './user-repos-style.css';

const UserRepos = (props) => {
    if (props.error) {
        return <div className="error-message">{props.error}</div>;
    }

    if (props.isPending) {
        return <Spinner />;
    }

    const notEmpty = Boolean(props.repos && props.repos.length);

    if (notEmpty) {
        return <UserRepoList repos={props.repos} />;
    }

    if (props.name) {
        return (
            <div className="empty-message">
                User <b className="empty-message__username">{props.name}</b> hasn't any repos
            </div>
        );
    }

    return null;
};

const mapStateToProps = (state) => {
    const { name, repos, error, isPending } = userDataSelector(state);
    return { name, repos, error, isPending };
};

UserRepos.propTypes = {
    name: PropTypes.string,
    repos: PropTypes.array,
    error: PropTypes.string,
    isPending: PropTypes.bool
};

export { UserRepos as UserReposPure };
export default connect(mapStateToProps)(UserRepos);

import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';

import { UserReposPure as UserRepos } from '../../src/components/user-repos/';

describe('<UserRepos />', () => {
    it('should render only error message when error passed', () => {
        const props = {
            error: 'error description'
        };

        const wrapper = shallow(<UserRepos {...props} />);

        expect(wrapper.is('.error-message'));
    });

    it('should render only <Spinner /> when isPending passed', () => {
        const props = {
            isPending: true
        };

        const wrapper = shallow(<UserRepos {...props} />);

        expect(wrapper.is('Spinner'));
    });

    it('should render only empty-message when no repos, but user passed', () => {
        const props = {
            repos: [],
            name: 'mike'
        };

        const wrapper = shallow(<UserRepos {...props} />);

        expect(wrapper.is('.empty-message'));

        const renderedText = wrapper.find('.empty-message__username').text();
        assert(renderedText === props.name, 'should render passed user name');
    });

    it('should render only <UserRepoList /> when enough data', () => {
        const props = {
            repos: [{ id: 1 }]
        };

        const wrapper = shallow(<UserRepos {...props} />);

        expect(wrapper.is('UserRepoList'));
    });

    it('shouldn\'t be rendered otherwise', () => {
        const props = {};

        const wrapper = shallow(<UserRepos {...props} />);

        expect(wrapper.isEmpty());
    });
});

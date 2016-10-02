import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import UserRepoList from '../../src/components/user-repo-list/';

describe('<UserRepoList />', () => {
    it('should render passed quantity of repos as <UserRepoItem />', () => {
        const props = {
            repos: [{ id: 1 }, { id: 2 }]
        };

        const wrapper = shallow(<UserRepoList {...props} />);

        expect(wrapper.find('UserRepoItem')).to.have.length(props.repos.length);
    });
});

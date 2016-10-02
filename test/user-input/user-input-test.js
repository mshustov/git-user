import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import { UserInputPure as UserInput } from '../../src/components/user-input/';

describe('<UserInput />', () => {
    it('should render wrapped Input', () => {
        const wrapper = shallow(<UserInput />);

        expect(wrapper.find('Input')).to.have.length(1);
    });

    it('should pass cb for <Input /> onChange', () => {
        const userUpdateRequested = sinon.spy();
        const props = { userUpdateRequested };

        const wrapper = mount(<UserInput {...props} />);

        wrapper.find('Input').prop('onChange')();
        expect(userUpdateRequested).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
    });
});

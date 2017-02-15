import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

class Wrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    unstable_handleError(e) {
        this.setState({ error: true });
    }
    render() {
        if (this.state.error) {
            return <div>error</div>;
        }

        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

const BadComponent = () => {
    throw new Error('oops');
    return <div>Some markup</div>
};

const App = () => (
    <Wrapper>
        <Modal isOpen={true} title="title">
            modal body
        </Modal>
        <BadComponent />
    </Wrapper>
);

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.querySelector('#root'));
}, false);


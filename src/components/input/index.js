import React, { Component, PropTypes } from 'react';

import './input-style.css';

class Input extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    // getError(error) {
    //     return error
    //     ? (
    //         <div className="input__error">
    //             {error}
    //         </div>
    //     )
    //     : null;
    // }

    handleChange(e) {
        const value = e.target.value;
        return this.props.onChange(value, e);
    }

    render() {
        return (
            <div className="input">
                {this.props.label &&
                    <label className="input__label">
                        {this.props.label}
                    </label>
                }
                <div className="input__wrapper">
                    <input
                        autoComplete={this.props.autoComplete}
                        autoFocus={this.props.autoFocus}
                        className="input__element"
                        name={this.props.name}
                        onBlur={this.props.onBlur}
                        onChange={this.handleChange}
                        onKeyDown={this.props.onKeyDown}
                        placeholder={this.props.placeholder}
                        type={this.props.type}
                    />
                    {this.props.children}
                    { /* this.getError(this.props.error) */ }
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    children: PropTypes.any,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string
};

Input.defaultProps = {
    autoComplete: 'off',
    error: false,
    type: 'text'
};

export default Input;

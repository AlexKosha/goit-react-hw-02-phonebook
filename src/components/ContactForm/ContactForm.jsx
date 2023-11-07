import React, { Component } from 'react';

import { FormInput, Form, FromButton } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeName = e => {
    this.setState({ name: e.currentTarget.value });
  };

  handleChangeNumber = e => {
    const value = e.currentTarget.value;
    const formattedValue = this.formatPhoneNumber(value);
    this.setState({ number: formattedValue });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };

  formatPhoneNumber = value => {
    return value.replace(/(\d{3})(\d{2})(\d{2})/g, '$1-$2-$3');
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <label>
          Name
          <FormInput
            type="text"
            name="name"
            required
            value={name}
            onChange={this.handleChangeName}
          />
        </label>
        <label>
          Number
          <FormInput
            type="tel"
            name="number"
            required
            value={number}
            onChange={this.handleChangeNumber}
            maxLength={7}
          />
        </label>
        <FromButton type="submit">Add contact</FromButton>
      </Form>
    );
  }
}

export default Form;

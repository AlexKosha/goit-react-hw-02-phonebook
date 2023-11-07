import React, { Component } from 'react';
import shortid from 'shortid';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    if (this.checkContactExists(name)) {
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleTodos = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  checkContactExists = newName => {
    const { contacts } = this.state;
    const isNameDublicate = contacts.some(contact => contact.name === newName);

    if (isNameDublicate) {
      console.log(newName);
      alert(`${newName} is alredy in contacts`);
      return true;
    }
  };

  render() {
    const { filter } = this.state;
    const visibleTodos = this.getVisibleTodos();
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter}></Filter>
          <ContactsList
            contacts={visibleTodos}
            onDeleteContact={this.deleteContact}
          ></ContactsList>
        </Section>
      </div>
    );
  }
}

export default App;

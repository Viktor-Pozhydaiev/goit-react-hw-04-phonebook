import React from 'react';
import { ContactForm } from './Form/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Section } from './Section/Section';
import Notiflix from 'notiflix';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };
  formSubmit = newContact => {
    const { contacts } = this.state;
    contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    )
      ? Notiflix.Notify.failure(`${newContact.name} is already  in contacts.`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };
  onSearch = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalize = filter.toLowerCase();
    const sortContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalize)
    );
    return sortContacts;
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <Section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit} />
        {contacts.length > 0 && (
          <>
            <Filter value={filter} onSearch={this.onSearch} />
            <ContactList
              contacts={this.filterContacts()}
              onDelete={this.deleteContact}
              title="Contacts"
            />
          </>
        )}
      </Section>
    );
  }
}

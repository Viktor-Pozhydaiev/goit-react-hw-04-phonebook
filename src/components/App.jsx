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
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  formSubmit = newContact => {
    const { contacts } = this.state;
    contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    )
      ? Notiflix.Notify.failure(`${newContact.name} is already  in contacts.`)
      : this.setState(
          prevState => ({
            contacts: [...prevState.contacts, newContact],
          }),
          Notiflix.Notify.success(`you added a contact: ${newContact.name}`)
        );
  };
  deleteContact = contactId => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      }),
      Notiflix.Notify.info('You have deleted a contact')
    );
  };
  onSearch = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
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
      <Section title="Phonebook">
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

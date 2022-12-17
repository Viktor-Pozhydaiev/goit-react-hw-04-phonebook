import React, { useState, useEffect } from 'react';
import { ContactForm } from './Form/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Section } from './Section/Section';
import Notiflix from 'notiflix';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parcedContacts = JSON.parse(savedContacts);
      return parcedContacts;
    }
    return [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const formSubmit = newContact => {
    contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    )
      ? Notiflix.Notify.failure(`${newContact.name} is already  in contacts.`)
      : setContacts(
          prevState => [newContact, ...prevState],
          Notiflix.Notify.success(`you added a contact: ${newContact.name}`)
        );
  };
  const deleteContact = id => {
    setContacts(
      prevState => prevState.filter(contact => contact.id !== id),

      Notiflix.Notify.info('You have deleted a contact')
    );
  };
  const onSearch = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const normalize = filter.toLocaleLowerCase();
    const sortContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalize)
    );
    return sortContacts;
  };

  return (
    <Section title="Phonebook">
      <ContactForm onSubmit={formSubmit} />
      {contacts.length > 0 && (
        <>
          <Filter value={filter} onSearch={onSearch} />
          <ContactList
            contacts={filterContacts()}
            onDelete={deleteContact}
            title="Contacts"
          />
        </>
      )}
    </Section>
  );
};

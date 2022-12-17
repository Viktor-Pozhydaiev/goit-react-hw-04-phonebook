import { Contact } from './Contact';
import css from '../ContactList/Contact.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, title, onDelete }) => {
  return (
    <ul className={css.contacts_list}>
      <h2>{title}</h2>
      {contacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          onDelete={onDelete}
          name={name}
          number={number}
        />
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

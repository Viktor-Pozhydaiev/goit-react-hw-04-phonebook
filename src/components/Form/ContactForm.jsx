import css from '../Form/Form.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ onSubmit }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handelChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        console.warn('You write something wrong, please try again !!!');
    }
  };

  const handelSubmit = evt => {
    evt.preventDefault();
    onSubmit({ number, name, id: nanoid() });
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <div>
      <form onSubmit={handelSubmit} className={css.form_wrapper}>
        <p className={css.name_form}> Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handelChange}
          id={nanoid()}
          required
        />
        <p className={css.phone_form}>Phone</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handelChange}
          id={nanoid()}
          required
        />
        <button className={css.form_btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };

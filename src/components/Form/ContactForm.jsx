import { Component } from 'react';
import css from '../Form/Form.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { ...INITIAL_STATE };

  handelChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.currentTarget.value });
  };

  handelSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state, id: nanoid() });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form onSubmit={this.handelSubmit} className={css.form_wrapper}>
          <p className={css.name_form}> Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={this.handelChange}
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
            onChange={this.handelChange}
            id={nanoid()}
            required
          />
          <button className={css.form_btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

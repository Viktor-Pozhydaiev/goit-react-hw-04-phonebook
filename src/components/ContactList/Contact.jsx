import css from '../ContactList/Contact.module.css';
import PropTypes from 'prop-types';

export const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={css.contact_item}>
      {name}: {number}
      <button
        className={css.contact_btn}
        onClick={() => onDelete(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};
Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

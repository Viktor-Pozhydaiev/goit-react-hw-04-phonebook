import css from '../Section/Section.module.css';
import PropTypes from 'prop-types';

export const Section = ({ children, title }) => {
  return (
    <div className={css.section}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
Section.propTypes = {
  children: PropTypes.array.isRequired,
};

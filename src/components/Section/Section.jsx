import css from '../Section/Section.module.css';
import PropTypes from 'prop-types';

export const Section = ({ children }) => {
  return <div className={css.section}>{children}</div>;
};
Section.propTypes = {
  children: PropTypes.array.isRequired,
};

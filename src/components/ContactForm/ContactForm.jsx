import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { contactFilter } from 'components/utils/ContactFormFunc';

const ContactForm = ({ addContact, contacts }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = nanoid();
    if (contactFilter(contacts, formData.name)) {
      Notiflix.Notify.warning(`${formData.name} is already in contacts`);
    } else {
      addContact({
        name: formData.name.trim(),
        number: formData.number.trim(),
        id: id,
      });
      setFormData({ name: '', number: '' });
    }
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.formLabel}>
          Name:
          <input
            className={css.formInput}
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.formLabel}>
          Number:
          <input
            className={css.formInput}
            type="tel"
            name="number"
            placeholder="Enter number"
            value={formData.number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
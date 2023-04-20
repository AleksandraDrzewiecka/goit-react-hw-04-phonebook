import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { filteredContacts } from 'components/utils/ContactListFunc';

function ContactList({ contacts, filter, deleteContact }) {
  const filtered = filteredContacts(contacts, filter);

  return (
    <ul className={css.contactList}>
      {filtered.map((contact) => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  deleteContact: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default ContactList;
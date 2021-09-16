import { LightningElement, wire } from 'lwc';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import E_MAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import reduceErrors from 'c/ldsUtils';

const COLUMNS = [
    { label: 'First Name', fieldName: FIRST_NAME_FIELD.fieldApiName, type: FIRST_NAME_FIELD.type },
    { label: 'Last Name', fieldName: LAST_NAME_FIELD.fieldApiName, type: LAST_NAME_FIELD.type },
    { label: 'Email', fieldName: E_MAIL_FIELD.fieldApiName, type: E_MAIL_FIELD.type },
];

export default class ContactList extends LightningElement {
    columns = COLUMNS;
    @wire(getContacts) contacts;

    get errors() {
        return (this.accounts.error) ? reduceErrors(this.accounts.error) : undefined;
    }
}
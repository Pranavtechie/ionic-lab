import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any[] = [];

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
    this.getContacts();
  }

  async getContacts() {
    try {
      const permission = await Contacts.requestPermissions();
      console.log('permission: ', permission.contacts);
      if(!permission.contacts) return;
      else if(permission.contacts == 'granted') {
        const result = await Contacts.getContacts({
          projection: {
            name: true,
            phones: true
          }
        });
        console.log('result: ', result);
        this.contacts = result.contacts;
        console.log(this.contacts);
      }
    } catch(e) {
      console.log(e);
    }
  }

  call(contact) {
    console.log(contact);
    let phoneNumber = contact.phones[0].number;
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}

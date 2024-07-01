import { Component, OnInit } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts : any[] = [];

  constructor() { }

  ngOnInit() {
    this.getContacts();
  }
  async getContacts(){
    try{
      const permission = await Contacts.requestPermissions();
      console.log("permission",permission);
      if(!permission.contacts) return;
      else if (permission.contacts === 'granted') {
        const result = await Contacts.getContacts({
          projection:{
            name:true,
            phones:true
          }

        });
        console.log("Result :- ",result);
      }

    }catch(e){
      console.log(e);
    }
  }

}

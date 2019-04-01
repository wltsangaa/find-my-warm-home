import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../Profile/Profile';
import { FindPropertyPage } from '../find-property/find-property';
import { BookmarkPage } from '../bookmark/bookmark';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FindPropertyPage;
  tab3Root = BookmarkPage;
  tab4Root = ContactPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}

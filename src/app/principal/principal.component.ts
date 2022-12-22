import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;
  private roles: string[] = [];

  constructor(private tokenStorage: TokenStorageService) { }

  userContent : any;

  ngOnInit(): void {


    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }


    console.log(this.tokenStorage.getUser)

      this.userContent = this.tokenStorage.getUser();
      console.log(this.userContent);
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}

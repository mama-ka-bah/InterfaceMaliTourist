import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  userContent : any;

  ngOnInit(): void {

    console.log(this.tokenStorage.getUser)

      this.userContent = this.tokenStorage.getUser();
    console.log(this.userContent);
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}

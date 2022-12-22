import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { UtilisateursService } from '../utilisateurs.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    passwordC: null,
    role:null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;
  private roles: string[] = [];

  constructor(private utilisateursService: UtilisateursService,
      private router : Router,
      private token: TokenStorageService,
    ) { }

  ngOnInit(): void {


    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }

   
  }

  onSubmit(): void {
    const { username, email, password, role } = this.form;

    if(this.isLoggedIn){
      this.utilisateursService.inscription(username, email, password, role).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;    
          
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }else{
      this.utilisateursService.inscriptionU(username, email, password).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;    
          
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
   
    if(this.isLoggedIn){
      this.router.navigateByUrl('/malitourist/accueil');
    }else{
      this.router.navigateByUrl('/connexion');
    }
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    passwordC: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private utilisateursService: UtilisateursService,
      private router : Router
    ) { }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.utilisateursService.inscription(username, email, password).subscribe(
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
    this.router.navigateByUrl('/malitourist/accueil');
  }

}

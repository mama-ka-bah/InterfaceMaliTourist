import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../region.service';
import { TokenStorageService } from '../token-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentaireService } from '../commentaire.service';


@Component({
  selector: 'app-detail-region',
  templateUrl: './detail-region.component.html',
  styleUrls: ['./detail-region.component.css']
})
export class DetailRegionComponent implements OnInit {

  detailsRegions !: any;
  currentUser !: any;
  idR !: any;
  commentaires !: any;
  photoaregionU !: any;

  admin = false;

  constructor(
    private routes : ActivatedRoute,
    private detaliR : RegionService,
    private token: TokenStorageService,
    private commentaire: CommentaireService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.detailRegions();
    this.commentairesRions();

    //this.formRegionU.get('code_region')!.setValue("this.detailsRegions.code_region");

    this.currentUser = this.token.getUser();
    console.log("jhdshj djhdj djdjh "+ this.currentUser.id);
    if(this.currentUser.roles.includes("ROLE_ADMIN")){
      this.admin = true;
    }

    this.currentUser = this.token.getUser().roles;
  }

  detailRegions(){
    this.idR = this.routes.snapshot.params['id'];
    this.detaliR.recupererDetailRegions(this.idR).subscribe( data =>{
      this.detailsRegions = data;
     console.log(this.detailsRegions)
    });
  }

  commentairesRions(){
    this.commentaire.recuperCommentairesRegions(this.idR).subscribe(data => {
      this.commentaires = data;
      console.log(this.commentaires);
    })
  }

  supprimerRions(){
    this.detaliR.supprimerRegions(this.idR).subscribe(data => {
      this.commentaires = data;
    })

    this.router.navigateByUrl('/malitourist/region');
    //this.reloadPage();
  }





  formCommentaire = new FormGroup({
    contenu : new FormControl('', [Validators.required, Validators.minLength(10)]),
  }) ;

  
  get fRegion() {
    return this.formCommentaire.controls;
  }

  submitCommentaire() {

   // alert("test")
   console.log("*******:  "+this.token.getUser().id);
    let data = new FormData();

      // this.photoaregion = this.formRegion.get('fileSource')!.value!;
   
       const region = [
          {
          "contenu": this.formCommentaire.get('contenu')!.value,
          "region":{
              "id": this.idR
          },
          "auteur":{
            "id":this.token.getUser().id
          }
        } 
          ]
            this.commentaire.ajouterComentaireAregion(region).subscribe(data => {
              console.log(data);
            });

            this.formCommentaire = new FormGroup({
              contenu: new FormControl('')
              }) ;

              //this.reloadPage();
  }

  annulerCommentaire(){
    this.formCommentaire = new FormGroup({
      contenu: new FormControl('')
      }) ;
  }







  formRegionU = new FormGroup({

    nomRegion : new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code_region: new FormControl('', [Validators.required, Validators.minLength(3)]),
    superficie: new FormControl('', [Validators.required]),
    langue_majoritaire: new FormControl('', [Validators.required, Validators.minLength(3)]),
    domaineAct: new FormControl('', [Validators.required, Validators.minLength(3)]),
    // annee: new FormControl(this.detailsRegions.annee, [Validators.required, Validators.minLength(3)]),
    nombreHabitant: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  }) ;

  
  get fRegionU() {
    return this.formRegionU.controls;
  }

  onFileChangeRegion(event:any) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.formRegionU.patchValue({

        fileSource: file

      });

    }

  }

  updateRegion() {

    alert("test")

    let data = new FormData();

      this.photoaregionU = this.formRegionU.get('fileSource')!.value!;
    
       const region = [
          {
          "id":this.detailsRegions.id,
          "code_region": this.formRegionU.get('code_region')!.value,
          "domaine_activite": this.formRegionU.get('domaineAct')!.value,
          "superficie": this.formRegionU.get('superficie')!.value,
          "description": this.formRegionU.get('description')!.value,
          "langue_majoritaire": this.formRegionU.get('langue_majoritaire')!.value,
          "nom": this.formRegionU.get('nomRegion')!.value,
          "idpays":{
              "id": 1,
              "nomp": "MALI"
          }
        } 
          ]

            this.detaliR.modifierRegion(this.photoaregionU, region).subscribe(data => {
              console.log(data);
            });

            this.formRegionU = new FormGroup({
                nomRegion : new FormControl(''),
                description: new FormControl(''),
                code_region: new FormControl(''),
                superficie: new FormControl(''),
                langue_majoritaire: new FormControl(''),
                domaineAct: new FormControl(''),
                // annee: new FormControl(''),
                nombreHabitant: new FormControl(''),

                file: new FormControl(''),
                fileSource: new FormControl('')
              }) ;

            //  this.actualise();
      
  }



  reloadPage(): void {
    window.location.reload();
  }

}

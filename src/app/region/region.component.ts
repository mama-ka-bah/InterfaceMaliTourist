import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Region } from '../region.model';
import { RegionService } from '../region.service';
import { TokenStorageService } from '../token-storage.service';



@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private regionService: RegionService,
    private token: TokenStorageService
  ) { }

  // getListeEntite() {
  //   this.activiteService.recupererListeEntite().subscribe((data) => {
  //     this.entites$ = data;
  //   })
  // }

  searchText:any;
  p:any;

  currentUser!: any;
  photoaregion!: any;
  admin = false;
  regions!: any;

  absenceRegions = false;

  regionObjet: Region = {
    nomRegion: "",
    description: "",
    code_region: "",
    superficie: "",
    langue_majoritaire: "",
  }


  formRegion = new FormGroup({

    //file, nom, description,nombrepersonnedemande, datedeb, datefin, idacteurs, idacteurInternes, libelleEntite, typeAct, libelleSalle, idresponsable, userid

    nomRegion : new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code_region: new FormControl('', [Validators.required, Validators.minLength(3)]),
    superficie: new FormControl('', [Validators.required]),
    langue_majoritaire: new FormControl('', [Validators.required, Validators.minLength(3)]),
    domaineAct: new FormControl('', [Validators.required, Validators.minLength(3)]),
    annee: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nombreHabitant: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  }) ;

  
  get fRegion() {
    return this.formRegion.controls;
  }

  onFileChangeRegion(event:any) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.formRegion.patchValue({

        fileSource: file

      });

    }

  }

  submitRegion() {

    alert("test")

    let data = new FormData();

      this.photoaregion = this.formRegion.get('fileSource')!.value!;
    
       const region = [
          {
          "code_region": this.formRegion.get('code_region')!.value,
          "domaine_activite": this.formRegion.get('domaineAct')!.value,
          "superficie": this.formRegion.get('superficie')!.value,
          "description": this.formRegion.get('description')!.value,
          "langue_majoritaire": this.formRegion.get('langue_majoritaire')!.value,
          "nom": this.formRegion.get('nomRegion')!.value,
          "idpays":{
              "id": 1,
              "nomp": "MALI"
          }
        } 
          ]

          const habitantAnnee = [
            {
              "annne":this.formRegion.get('annee')!.value,
              "nombreHabitant":this.formRegion.get('nombreHabitant')!.value
            } 
            ]  
            console.log(habitantAnnee);

            this.regionService.ajouter(this.photoaregion, region, habitantAnnee).subscribe(data => {
              console.log(data);
            });

            this.reloadPage();
            this.formRegion = new FormGroup({
                nomRegion : new FormControl(''),
                description: new FormControl(''),
                code_region: new FormControl(''),
                superficie: new FormControl(''),
                langue_majoritaire: new FormControl(''),
                domaineAct: new FormControl(''),
                annee: new FormControl(''),
                nombreHabitant: new FormControl(''),

                file: new FormControl(''),
                fileSource: new FormControl('')
              }) ;

            //  this.actualise();
      
  }



  recupererAllREgions(){
    this.regionService.recupererRegions().subscribe(data => {
      this.regions = data;
      console.log(this.regions.length)
      if(this.regions.length == 0){
        this.absenceRegions = true;
      }
      console.log(this.regions);
    });
  }

    

      // data.append("nomRegion", this.formRegion.get('nomRegion')!.value!);
      // data.append("description", this.formRegion.get('description')!.value!);
      // data.append("domaineAct", this.formRegion.get('domaineAct')!.value!);
      // data.append("langue_majoritaire", this.formRegion.get('langue_majoritaire')!.value!);
      // data.append("code_region", this.formRegion.get('code_region')!.value!);
      // data.append("superficie", this.formRegion.get('superficie')!.value!);

      // this.regionObjet.code_region = this.formRegion.get('nomRegion').value;

      // this.http.post<any>(`http://localhost:8080/region/ajout_region_habitant/`, data, {} ).subscribe(res => {

      // });

      reloadPage(): void {
        window.location.reload();
      }


      ngOnInit(): void {
        // throw new Error('Method not implemented.');
        this.recupererAllREgions();
        this.currentUser = this.token.getUser();
        if(this.currentUser.roles.includes("ROLE_ADMIN")){
          this.admin = true;
        }
      }



}



 



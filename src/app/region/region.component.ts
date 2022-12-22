import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Region } from '../region.model';
import { RegionService } from '../region.service';
import { TokenStorageService } from '../token-storage.service';
import Swal from 'sweetalert2';



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

  searchText: any;
  p: any;

  currentUser!: any;
  photoaregion!: any;
  admin = false;
  regions!: any;

  codeCRE = false;
  submit = false;

  erreurnom = false;
  erreurcode = false;
  erreurlangue = false;
  erreurdescript = false;
  erreurannee = false;
  erreuract = false;
  erreursuperficie = false;

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

    nomRegion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(255)]),
    code_region: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    superficie: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(9)]),
    langue_majoritaire: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    domaineAct: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    annee: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    nombreHabitant: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(9)]),

    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  });


  get fRegion() {
    return this.formRegion.controls;
  }


  // convenience getter for easy access to form fields
  // get f() { return this.registerForm.controls; }

  // onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.registerForm.invalid) {
  //         return;
  //     }

  // display form values on success
  //     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  // }


  onFileChangeRegion(event: any) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.formRegion.patchValue({

        fileSource: file

      });

    }

  }

  verificationFormulaire() {
    if (this.formRegion.invalid) {

      if (this.formRegion.get('code_region')!.value?.length == 0 || this.formRegion.get('langue_majoritaire')!.value?.length == 0 ||
        this.formRegion.get('description')!.value?.length == 0 || this.formRegion.get('domaineAct')!.value?.length == 0 ||
        this.formRegion.get('superficie')!.value?.length == 0 || this.formRegion.get('nomRegion')!.value?.length == 0
        || this.formRegion.get('annee')!.value?.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      } else {
        alert("cette region va etre ajoute")
      }
    }
  }

  submitRegion() {

    this.submit = true;

    if (this.formRegion.invalid) {
      if (this.formRegion.get('code_region')!.value?.length == 0 || this.formRegion.get('langue_majoritaire')!.value?.length == 0 ||
        this.formRegion.get('description')!.value?.length == 0 || this.formRegion.get('domaineAct')!.value?.length == 0 ||
        this.formRegion.get('superficie')!.value?.length == 0 || this.formRegion.get('nomRegion')!.value?.length == 0
        || this.formRegion.get('annee')!.value?.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      } else {
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
            "idpays": {
              "id": 1,
              "nomp": "MALI"
            }
          }
        ]

        const habitantAnnee = [
          {
            "annne": this.formRegion.get('annee')!.value,
            "nombreHabitant": this.formRegion.get('nombreHabitant')!.value
          }
        ]
        console.log(habitantAnnee);
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.regionService.ajouter(this.photoaregion, region, habitantAnnee).subscribe(data => {
              console.log(data);
            });

            this.formRegion = new FormGroup({
              nomRegion: new FormControl(''),
              description: new FormControl(''),
              code_region: new FormControl(''),
              superficie: new FormControl(''),
              langue_majoritaire: new FormControl(''),
              domaineAct: new FormControl(''),
              annee: new FormControl(''),
              nombreHabitant: new FormControl(''),

              file: new FormControl(''),
              fileSource: new FormControl('')

            });
            this.reloadPage();

            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })




        //}

      }


    }
  }





  recupererAllREgions() {
    this.regionService.recupererRegions().subscribe(data => {
      this.regions = data;
      console.log(this.regions.length)
      if (this.regions.length == 0) {
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
    if (this.currentUser.roles.includes("ROLE_ADMIN")) {
      this.admin = true;
    }

    this.formRegion;

    //this.verificationFormulaire();

    console.log(this.submit);


  }



}







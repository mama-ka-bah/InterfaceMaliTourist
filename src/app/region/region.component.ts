import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Region } from '../region.model';



@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }
  photoaregion!: File;

  regionObjet: Region = {
    nomRegion: "",
    description: "",
    code_region: "",
    superficie: 0,
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

    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  });

  

  get fRegion() {

    return this.formRegion.controls;

  }

  // onFileChangeRegion(event) {

  //   if (event.target.files.length > 0) {

  //     const file = event.target.files[0];

  //     this.formRegion.patchValue({

  //       fileSource: file

  //     });

  //   }

  // }

  submitRegion() {

    let data = new FormData();

    // if(this.formRegion.get('file').value.length == 0){}

    //   data.append("file", this.formRegion.get('fileSource').value);
    //   data.append("nomRegion", this.formRegion.get('nomRegion').value);
    //   data.append("description", this.formRegion.get('description').value);
    //   data.append("domaineAct", this.formRegion.get('domaineAct').value);
    //   data.append("langue_majoritaire", this.formRegion.get('langue_majoritaire').value);
    //   data.append("code_region", this.formRegion.get('code_region').value);
    //   data.append("superficie", this.formRegion.get('superficie').value);

      // this.regionObjet.code_region = this.formRegion.get('nomRegion').value;

      // this.http.post<any>(`http://localhost:8080/region/ajout_region_habitant/`, data, {} ).subscribe(res => {

      // });
  }



  ngOnInit(): void {
  }

}

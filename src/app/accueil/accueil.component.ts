import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  regions!:any;
  image1!:any;
  image2!:any;
  image3!:any;
  image4!:any;

  constructor(
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    this.recupererRegionFavorite();
  }

  recupererRegionFavorite(){
    this.regionService.regionsFavorit().subscribe(data => {
      this.regions = data;
      console.log(data);

      for(var i = 0; this.regions.length; i++){
        if(i == 0){
          this.image1 = this.regions[i].photoaregion;
        }else if(i == 1){
          this.image2 = this.regions[i].photoaregion;
        }else if(i == 3){
          this.image3 = this.regions[i].photoaregion;
        }else{
          this.image4 = this.regions[i].photoaregion;
        }
      }

    })
  }

}

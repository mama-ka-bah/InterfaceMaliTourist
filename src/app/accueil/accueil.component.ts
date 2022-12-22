import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  regions!:any;
  image1!:null;
  image2!:null;
  image3!:null;
  image4!:null;

  constructor(
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    this.recupererRegionFavorite();

    // for(var i = 0; i<this.regions.length ; i++){
    //   if(i==0){
    //     this.image1 = this.regions.photoaregion
    //   }else{
    //     this.image1 = null
    //   }
    //   if(i==1){
    //     this.image2 = this.regions.photoaregion
    //   }else{
    //     this.image2 = null
    //   }
    //   if(i==2){
    //     this.image3 = this.regions.photoaregion
    //   }else{
    //     this.image3 = null
    //   }
    //   if(i==3){
    //     this.image4 = this.regions.photoaregion
    //   }else{
    //     this.image4 = null
    //   }
    // }

  }

  recupererRegionFavorite(){
    this.regionService.regionsFavorit().subscribe(data => {
      this.regions = data;
      console.log(data);
    })
  }

}

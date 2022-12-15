import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DetailRegionComponent } from './detail-region/detail-region.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [

  {
    path:'',
    redirectTo:"/accueil",
    pathMatch:"full"
  },

  { path:'accueil',component:AccueilComponent }, 
  { path:'detailregion',component:DetailRegionComponent }, 
  { path:'region',component:RegionComponent }, 
  { path:'connexion',component:ConnexionComponent }, 
  { path:'inscription',component:InscriptionComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

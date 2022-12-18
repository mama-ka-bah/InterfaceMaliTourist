import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RegionComponent } from './region/region.component';
import { DetailRegionComponent } from './detail-region/detail-region.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PrincipalComponent } from './principal/principal.component';
import { httpInterceptorProviders } from './connexion/_helpers/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    RegionComponent,
    DetailRegionComponent,
    ConnexionComponent,
    InscriptionComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

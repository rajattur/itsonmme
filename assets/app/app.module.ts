import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CompareComponent } from './compare/compare.component';
import { CompareInputComponent } from './compare/compare-input/compare-input.component';
import { CompareResultsComponent } from './compare/compare-results/compare-results.component';
import { AppRoutingModule } from './app-routing.module';
import { CompareService } from './compare/compare.service';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        SigninComponent,
        CompareComponent,
        CompareInputComponent,
        CompareResultsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [AuthService, CompareService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/articles-show/article.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleCreateComponent } from './article/article-create/article-create.component';
import { ToastComponent } from './shared/components/UI/toast/toast.component';
import {FooterComponent} from "./shared/templates/footer/footer.component";
import {HeaderComponent} from "./shared/templates/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomepageComponent,
    ArticleCreateComponent,
    ToastComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

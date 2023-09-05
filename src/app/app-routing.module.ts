import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'homepage'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'article-list', component: ArticleComponent},
  {path: 'article-creation', component: ArticleCreateComponent},
  // {path: '/article-edit/:id', component: ArticleEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

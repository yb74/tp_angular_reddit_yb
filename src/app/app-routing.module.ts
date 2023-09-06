import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/articles-show/article.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleCreateComponent } from './article/article-create/article-create.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'homepage'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'article-list', component: ArticleComponent},
  {path: 'article-creation', component: ArticleCreateComponent},
  {path: 'article-edit/:id', component: ArticleUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

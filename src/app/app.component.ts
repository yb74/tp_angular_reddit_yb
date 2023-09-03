import { Component, OnInit } from '@angular/core';
import { Article } from './article/article.model';
import { ArticleService } from './services/articles/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TP2';
  articles: Article[] = [];
  selectedArticle: Article = {id: 0, votes: 0, title: 'dummy', link: 'link'}

  articleCreationForm = this.formBuilder.group({
    title: ['', Validators.required],
    link: ['', Validators.required]
  }) 

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((res) => {
      this.articles = res
    })
  }

  modifyingVotes(event: boolean) {
    this.sortedArticles()
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes)
  }

  shouldShowErrorStyle(): boolean {
    // Check if the form is invalid (has validation errors)
    return this.articleCreationForm.invalid;
  }

  addArticle(articleCreationForm: FormGroup) {
    const newArticle: Article = articleCreationForm.value
    newArticle.votes = 0
    this.articleService.postArticle(newArticle).subscribe((addedArticle) => {
      this.articles.push(addedArticle);
    });
    // Reset the form to its initial state after submission
    this.articleCreationForm.reset();
  }

  handleArticleRemoval(article: Article) {
    const indexToRemove = this.articles.indexOf(article);
    this.articleService.deleteArticle(article.id).subscribe(() => {
      this.articles.splice(indexToRemove, 1);
    });
  }

  updateArticle(title: HTMLInputElement, link: HTMLInputElement, id: number) {
    const a = {id: id, votes: this.selectedArticle.votes, title: title.value, link: link.value}
    this.articleService.updateArticle(a).subscribe(() => {
      this.articleService.getArticles()
    })
  }
}

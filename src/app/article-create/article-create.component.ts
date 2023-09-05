import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/articles/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  articles: Article[] = [];

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
}

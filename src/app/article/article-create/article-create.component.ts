import { Component, OnInit } from '@angular/core';
import { Article } from '../article.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../services/articles/article.service';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  articles: Article[] = [];

  public isToastVisible$: Observable<boolean>;

  articleCreationForm = this.formBuilder.group({
    title: ['', Validators.required],
    link: ['', Validators.required]
  })

  constructor(private articleService: ArticleService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.isToastVisible$ = this.toastService.isToastVisible$;
  }

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
      // displaying toast message
      this.toastService.updateToastMessage(`The article ${addedArticle.title} has been created ! `);
      this.toastService.updateToastVisibility(true);
        setTimeout(() => {
          this.toastService.updateToastVisibility(false);
        }, 5000);
    });
    // Reset the form to its initial state after submission
    this.articleCreationForm.reset();
  }
}

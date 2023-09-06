import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/articles/article.service';
import { ToastService } from '../services/toast/toast.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {
  articleId!: string;
  public isToastVisible$: Observable<boolean>;

  articleUpdateForm = this.formBuilder.group({
    title: ['', Validators.required],
    link: ['', Validators.required]
  })

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.isToastVisible$ = this.toastService.isToastVisible$;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id !== null) {
        this.articleId = id;
      } else {
        // displaying toast message
        this.toastService.updateToastMessage(`The id in param is null ! `);
        this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
      }
    });
  }

  shouldShowErrorStyle(): boolean {
    return this.articleUpdateForm.invalid;
  }

  editArticle(articleUpdateForm: FormGroup) {
    console.log(this.articleId)
  }
}

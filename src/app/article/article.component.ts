import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Article } from './article.model';
import { ArticleService } from '../services/articles/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article!: Article;
  @Output() remove = new EventEmitter<Article>();

  updateMode = false;
  voteChanges = 0;

  constructor(
    private httpService: ArticleService
  ) {}

  ngOnInit(): void {

  }

  removeArticle(article: Article) {
    this.remove.emit(article);
  }

  voteUp() {
    this.voteChanges++;
    this.article.votes++;
  }

  voteDown() {
    this.voteChanges--;
    this.article.votes--;
  }

  startUpdate() {
    this.updateMode = true;
  }

  saveUpdate() {
    this.httpService.updateArticle(this.article, this.voteChanges).subscribe(updatedArticle => {
      this.updateMode = false;
    });
  }

  cancelUpdate() {
    this.updateMode = false;
  }
}

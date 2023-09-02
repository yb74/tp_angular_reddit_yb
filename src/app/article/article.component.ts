import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Article } from './article.model';
import { ArticleService } from '../services/articles/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  @Input()
  article!: Article;

  @Output()
  remove = new EventEmitter<Article>();

  @Output()
  modifyingVotes = new EventEmitter<boolean>();

  updateMode = false;

  constructor(
    private httpService: ArticleService
  ) {}

  removeArticle(article: Article) {
    this.remove.emit(article);
  }

  voteUp() {
    this.article.votes++;
    this.modifyingVotes.emit(true);
  }

  voteDown() {
    this.article.votes--;
    this.modifyingVotes.emit(true);
  }

  startUpdate() {
    this.updateMode = true;
  }

  saveUpdate() {
    this.httpService.updateArticle(this.article).subscribe(updatedArticle => {
      this.updateMode = false;
    });
  }

  cancelUpdate() {
    this.updateMode = false;
  }
}

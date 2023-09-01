import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Article } from './article.model';
import { HttpserviceService } from '../httpservice.service';

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

  // articles!: Article[]

  constructor(
    private httpService: HttpserviceService
  ) {}

  ngOnInit(): void {
      // this.article = new Article(0, 'Default Title', 'Default Link');
  }

  removeArticle(article: Article) {
    this.remove.emit(article);
  }

  voteUp(): boolean {
    this.article.votes++;
    this.httpService.updateArticle(this.article).subscribe(updatedArticle => {
      this.article = updatedArticle; // Update the local article with the response from the backend
    });
    return false;
  }
  
  voteDown(): boolean {
    this.article.votes--;
    this.httpService.updateArticle(this.article).subscribe(updatedArticle => {
      this.article = updatedArticle; // Update the local article with the response from the backend
    });
    return false;
  }

  startUpdate() {
    this.updateMode = true;
  }

  saveUpdate() {
    this.httpService.updateArticle(this.article).subscribe(updatedArticle => {
      this.article = updatedArticle;
      this.updateMode = false;
    });
  }

  cancelUpdate() {
    this.updateMode = false;
  }
}

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
  voteChanges = 0;

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
    this.voteChanges++;
    this.article.votes++;
    return false;
  }
  
  voteDown(): boolean {
    this.voteChanges--;
    this.article.votes--;
    return false;
  }

  startUpdate() {
    this.updateMode = true;
  }

  saveUpdate() {
    this.httpService.updateArticle(this.article, this.voteChanges).subscribe(updatedArticle => {
      this.article = updatedArticle;
      this.voteChanges = 0;
      this.updateMode = false;
    });
  }

  cancelUpdate() {
    this.updateMode = false;
  }
}

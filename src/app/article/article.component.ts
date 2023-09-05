import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Article } from './article.model';
import { ArticleService } from '../services/articles/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle: Article = {id: 0, votes: 0, title: 'dummy', link: 'link'}
  selectedArticleId: number = -1;

  constructor(
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((res) => {
      this.articles = res
    })
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes)
  }
  
  removeArticle(article: Article) {
    const indexToRemove = this.articles.indexOf(article);
    this.articleService.deleteArticle(article.id).subscribe(() => {
      this.articles.splice(indexToRemove, 1);
    });
  }

  voteUp(article: Article) {
    article.votes++;
    this.sortedArticles()
  }

  voteDown(article: Article) {
    article.votes--;
    this.sortedArticles()
  }

  startUpdate(article: Article) {
    this.selectedArticleId = article.id;
  }

  isUpdateMode(article: Article): boolean {
    return this.selectedArticleId === article.id;
  }

  saveUpdate(article: Article) {
    this.articleService.updateArticle(article).subscribe(() => {
      this.selectedArticleId = -1;
    });
  }

  cancelUpdate() {
    this.selectedArticleId = -1;
  }

  updateArticle(title: HTMLInputElement, link: HTMLInputElement, id: number) {
    const a = {id: id, votes: this.selectedArticle.votes, title: title.value, link: link.value}
    this.articleService.updateArticle(a).subscribe(() => {
      this.articleService.getArticles()
    })
  }
}

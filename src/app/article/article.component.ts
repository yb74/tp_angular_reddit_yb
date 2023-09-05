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

  @Input()
  article!: Article;

  updateMode = false;

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

  startUpdate() {
    this.updateMode = true;
  }

  saveUpdate() {
    this.articleService.updateArticle(this.article).subscribe(() => {
      this.updateMode = false;
    });
  }

  cancelUpdate() {
    this.updateMode = false;
  }

  updateArticle(title: HTMLInputElement, link: HTMLInputElement, id: number) {
    const a = {id: id, votes: this.selectedArticle.votes, title: title.value, link: link.value}
    this.articleService.updateArticle(a).subscribe(() => {
      this.articleService.getArticles()
    })
  }
}

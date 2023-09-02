import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './article/article.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private client: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.client.get<Article[]>('http://localhost:3000/articles').pipe(
      map((articles) => this.sortArticlesByVotes(articles))
    );
  }

  private sortArticlesByVotes(articles: Article[]): Article[] {
    return articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

  postArticle(article: Article): Observable<Article> {
    return this.client.post<Article>('http://localhost:3000/articles', article);
  }

  deleteArticle(id: number) {
    return this.client.delete(`http://localhost:3000/articles/${id}`);
  }

  updateArticle(article: Article, voteChanges: number = 0): Observable<Article> {
    const updateData = {
      ...article,
      votes: article.votes
    };
    return this.client.put<Article>(`http://localhost:3000/articles/${article.id}`, updateData);
  }
}

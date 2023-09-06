import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../article/article.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:3000/articles').pipe(
      map(articles => articles.sort((a: Article, b: Article) => b.votes - a.votes))
    )
  }

  getArticleById(articleId: string): Observable<Article> {
    return this.http.get<Article>(`your-api-url/articles/${articleId}`);
  }

  postArticle(article: Article) {
    return this.http.post<Article>('http://localhost:3000/articles', article);
  }

  deleteArticle(id: number) {
    return this.http.delete(`http://localhost:3000/articles/${id}`);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`http://localhost:3000/articles/${article.id}`, article);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../../article/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:3000/articles')
  }

  postArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('http://localhost:3000/articles', article);
  }

  deleteArticle(id: number) {
    return this.http.delete(`http://localhost:3000/articles/${id}`);
  }

  updateArticle(article: Article, voteChanges: number = 0): Observable<Article> {
    const updateData = {
      ...article,
      votes: article.votes
    };
    return this.http.put<Article>(`http://localhost:3000/articles/${article.id}`, updateData);
  }
}
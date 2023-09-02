import { Component, OnInit } from '@angular/core';
import { Article } from './article/article.model';
import { HttpserviceService } from './httpservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TP2';
  articles: Article[] = [];

  updateOn = false
  selectedArticle: Article = {id: 0, votes: 0, title: 'dummy', link: 'link'}

  constructor(private service: HttpserviceService) {}

  ngOnInit() {
    this.service.getArticles().subscribe((res) => this.articles = res)
  }

  addArticle(title: string, link: string) {
    const newArticle = {id: 0, votes: 0, title: title, link: link};
  
    this.service.postArticle(newArticle).subscribe((addedArticle) => {
      this.articles.push(addedArticle);
    });
  }

  handleArticleRemoval(article: Article) {
    const indexToRemove = this.articles.indexOf(article);
    this.service.deleteArticle(article.id).subscribe(() => {
      this.articles.splice(indexToRemove, 1);
    });
  }

  sortedArticles(): Article[] {
    return  this.articles.sort((a: Article, b: Article) => b.votes - a.votes)
  }

  updateArticle(title: HTMLInputElement, link: HTMLInputElement, id: number) {
    const a = {id: id, votes: this.selectedArticle.votes, title: title.value, link: link.value}
    this.service.updateArticle(a).subscribe((data) => {
      this.service.getArticles()
    })
    this.updateOn = false
  }
}

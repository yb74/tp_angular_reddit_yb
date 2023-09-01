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

  updateOn: boolean = false
  selectedArticle: Article = new Article(5, 'dummy', 'link')

  constructor(private service: HttpserviceService) {}

  ngOnInit() {
    this.service.getArticles().subscribe(restArticle => this.articles = restArticle)
  }

  addArticle(title: string, link: string) {
    const newArticle = new Article(0, title, link);
  
    this.service.postArticle(newArticle).subscribe((addedArticle) => {
      this.articles.push(addedArticle);
    });
  
    return false;
  }

  handleArticleRemoval(article: Article) {
    const indexToRemove = this.articles.indexOf(article);
    if (indexToRemove !== -1) {
      this.service.deleteArticle(article.id).subscribe(() => {
        this.articles.splice(indexToRemove, 1);
      });
    }
    return false;
  }

  sortedArticles(): Article[] {
    return  this.articles.sort((a: Article, b: Article) => b.votes - a.votes)
  }

  updateArticle(title: HTMLInputElement, link: HTMLInputElement, id: number) {
    const a = new Article(this.selectedArticle.votes, link.value, title.value)
    a.id = id
    this.service.updateArticle(a).subscribe((data) => {
      this.service.getArticles()
    })
    this.updateOn = false
  }
}

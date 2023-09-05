import { Component, OnInit } from '@angular/core';
import { Article } from './article/article.model';
import { ArticleService } from './services/articles/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TP2';
  
  constructor() {}

  ngOnInit() {
    
  }
}

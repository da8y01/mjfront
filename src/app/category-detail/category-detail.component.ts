import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { contentHeaders } from '../headers';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category
  topComments = []
  options = new RequestOptions({ headers: contentHeaders });
  bgImage

  constructor(private http: Http, public route: ActivatedRoute, private sanitization:DomSanitizer) { }

  ngOnInit() {
    this.http.get(`https://www.reddit.com/reddits.json`, this.options).toPromise().then(reddits => {
      this.category = reddits.json().data.children.filter(category => category.data.id === this.route.snapshot.params.categoryId)[0].data;
      this.bgImage = this.sanitization.bypassSecurityTrustStyle(`url(${this.category.icon_img})`);
      this.http.get(`https://www.reddit.com${this.category.url}.json`, this.options).toPromise().then(response => {
        this.topComments = response.json().data.children.slice(0, 5).map(comment => {return comment.data});
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  }
}

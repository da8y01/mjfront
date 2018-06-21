import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { contentHeaders } from '../headers';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = []
  options = new RequestOptions({ headers: contentHeaders });
  displayedColumns = ['icon', 'title', 'description'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get(`https://www.reddit.com/reddits.json`, this.options).toPromise().then(reddits => {
      this.categories = reddits.json().data.children;
      this.dataSource = new MatTableDataSource(reddits.json().data.children);
      this.dataSource.paginator = this.paginator;
    }).catch(err => console.error(err));
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { contentHeaders } from '../headers';
import { Http, RequestOptions, Response } from '@angular/http';

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
    this.http.get('https://www.reddit.com/reddits.json', this.options).toPromise().then(reddits => {
      console.log(reddits.json());
      this.categories = reddits.json().data.children;
      this.dataSource = new MatTableDataSource(reddits.json().data.children);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    }).catch(err => console.error(err));
  }

}

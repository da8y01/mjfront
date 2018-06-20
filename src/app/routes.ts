import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: ':categoryId', component: CategoryDetailComponent },
  { path: '**', component: NotFoundComponent }
];

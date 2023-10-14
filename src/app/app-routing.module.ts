import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { Book } from 'src/global/interfaces';
import { AllDataPageComponent } from './components/all-data-page/all-data-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'details/:data',
    component: DetailsPageComponent,
  },
  {
    path: 'all',
    component: AllDataPageComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

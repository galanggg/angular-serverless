import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationListComponent } from 'src/app/component/organization-list/organization-list.component';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [OrganizationListComponent, HomeComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [OrganizationListComponent, HomeComponent],
})
export class HomeModule {}

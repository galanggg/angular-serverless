import { Component, OnInit } from '@angular/core';
import { OrganizationListService } from '../../services/organization-list.service';
import { Organization } from '../../models/Organization';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  organizationList!: Observable<Organization[]>;
  dataOrg!: any;
  constructor(private organizationListService: OrganizationListService) {}

  ngOnInit(): void {
    this.organizationListService
      .getOrganizationList()
      .subscribe((data) => (this.dataOrg = data));
  }
}

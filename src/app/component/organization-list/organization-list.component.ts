import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  @Input() organization: any;

  constructor() {}

  ngOnInit(): void {}
}

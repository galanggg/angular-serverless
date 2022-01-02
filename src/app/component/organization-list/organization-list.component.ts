import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  @Input() organization: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  async triggerCreateCheckout(eventOrganization: any) {
    const createCheckoutResponse = await this.http.post(
      '/.netlify/functions/createCheckout',
      eventOrganization,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const lastResponse = await lastValueFrom(createCheckoutResponse);
    this.openStripe(lastResponse);
  }

  openStripe = async (stripeParams: any) => {
    const stripe = await loadStripe(stripeParams.publishableKey);
    const { error } = await stripe!.redirectToCheckout({
      sessionId: stripeParams.sessionId,
    });
  };
}

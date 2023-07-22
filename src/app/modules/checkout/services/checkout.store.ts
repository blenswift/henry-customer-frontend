import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { LoadingStatus } from 'src/app/shared/models/loading-status';

export interface CheckoutState {
  status: LoadingStatus;
}

@Injectable()
export class CheckoutStore extends ComponentStore<CheckoutState> {
  readonly vm$ = this.select(state => state);

  constructor() {
    super({ status: 'INIT' });
  }

  updateStatus = this.updater((state, status: LoadingStatus) => ({ status }));
}

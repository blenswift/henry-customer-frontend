import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concat, Observable, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { LoadingStatus } from 'src/app/shared/models/loading-status';
import { Product } from 'src/app/shared/models/product';
import { Restaurant } from '../models/restaurant';
import { MenuService } from './menu.service';
import { RestaurantService } from './restaurant.service';

export interface RestaurantState {
  categories: Category[];
  products: Product[];
  info: Restaurant | null;
  status: LoadingStatus;
}

@Injectable()
export class RestaurantStore extends ComponentStore<RestaurantState> {
  readonly categories$ = this.select(state => state.categories);
  readonly products$ = this.select(state => state.products);
  readonly info$ = this.select(state => state.info);
  readonly status$ = this.select(state => state.status);

  constructor(private menuService: MenuService, private restaurantService: RestaurantService) {
    super({ categories: [], products: [], info: null, status: 'LOADING' });
  }

  load = this.effect((qrCode$: Observable<string>) => {
    return qrCode$.pipe(
      tap(() => this.patchState({ status: 'LOADING' })),
      switchMap(qrCode =>
        concat(
          this.menuService.getMenu(qrCode).pipe(
            tapResponse(
              menu => {
                this.patchState({ categories: menu.categories, products: menu.products });
              },
              err => {
                this.patchState({ status: 'ERROR' });
              }
            )
          ),
          this.restaurantService.getRestaurant(qrCode).pipe(
            tapResponse(
              info => {
                this.patchState({ info, status: info.open ? 'DATA' : 'CLOSED' });
              },
              err => {
                this.patchState({ status: 'ERROR' });
              }
            )
          )
        )
      )
    );
  });

  callService = this.effect((qrCode$: Observable<string>) => {
    return qrCode$.pipe(switchMap(qrCode => this.restaurantService.callService(qrCode)));
  });
}

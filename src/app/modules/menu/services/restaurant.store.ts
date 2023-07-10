import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, concat, map, switchMap, tap } from 'rxjs';
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
  filters: Filter[];
  status: LoadingStatus;
}

export interface Filter {
  name: string;
  active: boolean;
}

@Injectable()
export class RestaurantStore extends ComponentStore<RestaurantState> {
  readonly categories$ = this.select(state => state.categories);
  readonly products$ = this.select(state => state.products);
  readonly info$ = this.select(state => state.info);
  readonly status$ = this.select(state => state.status);
  readonly filters$ = this.select(state => state.filters);
  readonly ageRestrictedProducts$ = this.products$.pipe(map(y => y.filter(x => x.legalAge > 0)));

  constructor(
    private menuService: MenuService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private titleService: Title
  ) {
    super({ categories: [], filters: [], products: [], info: null, status: 'LOADING' });
  }

  load = this.effect((qrCode$: Observable<string>) => {
    return qrCode$.pipe(
      tap(() => this.patchState({ status: 'LOADING' })),
      switchMap(qrCode =>
        concat(
          this.menuService.getMenu(qrCode).pipe(
            tapResponse(
              menu => {
                this.patchState({
                  categories: menu.categories,
                  products: menu.products,
                  filters: menu.filters.map(filter => ({ name: filter, active: false })),
                });
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
                this.titleService.setTitle('OrderXPay - ' + info.name);
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
    return qrCode$.pipe(
      switchMap(qrCode => this.restaurantService.callService(qrCode)),
      tapResponse(
        () => {
          this.openSnackBar();
        },
        () => {}
      )
    );
  });

  updateFilters = this.updater((state, filters: Filter[]) => ({ ...state, filters }));

  openSnackBar() {
    this.snackBar.open(this.translateService.instant('WAITER_COMING'), undefined, { duration: 3000 });
  }
}

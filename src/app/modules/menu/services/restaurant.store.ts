import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, concat, map, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { LoadingStatus } from 'src/app/shared/models/loading-status';
import { Product } from 'src/app/shared/models/product';
import { QrCodeType } from 'src/app/shared/models/qrCodeType';
import { Restaurant } from '../models/restaurant';
import { MenuService } from './menu.service';
import { RestaurantService } from './restaurant.service';

export interface RestaurantState {
  id: string;
  categories: Category[];
  products: Product[];
  qrCodeType: QrCodeType;
  info: Restaurant | null;
  filters: Filter[];
  status: LoadingStatus;
}

export interface Filter {
  name: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantStore extends ComponentStore<RestaurantState> {
  readonly restaurantId$ = this.select(state => state.id);
  readonly categories$ = this.select(state => state.categories);
  readonly products$ = this.select(state => state.products);
  readonly info$ = this.select(state => state.info);
  readonly status$ = this.select(state => state.status);
  readonly filters$ = this.select(state => state.filters);
  readonly ageRestrictedProducts$ = this.products$.pipe(map(y => y.filter(x => x.legalAge > 0)));
  readonly qrCodeType$ = this.select(state => state.qrCodeType);

  constructor(
    private menuService: MenuService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private titleService: Title,
    private router: Router
  ) {
    super({ id: '', categories: [], filters: [], products: [], info: null, status: 'LOADING', qrCodeType: 'MENU' });
  }

  load = this.effect($ => {
    return $.pipe(
      tap(() => this.patchState({ status: 'LOADING' })),
      switchMap(() =>
        concat(
          this.menuService.getMenu(sessionStorage.getItem('qrcode')!).pipe(
            tapResponse(
              menu => {
                this.patchState({
                  categories: menu.categories,
                  products: menu.products,
                  filters: menu.filters.map(filter => ({ name: filter, active: false })),
                  qrCodeType: menu.qrCodeType,
                });
              },
              (err: any) => {
                this.patchState({ status: 'ERROR' });
                if (err['error']['errorCode'] !== 'BAD_REQUEST_CONTENT') {
                  this.router.navigate(['notfound']);
                }
              }
            )
          ),
          this.restaurantService.getRestaurant(sessionStorage.getItem('qrcode')!).pipe(
            tapResponse(
              info => {
                this.patchState({ info, status: info.open ? 'DATA' : 'CLOSED', id: info.id });
                this.titleService.setTitle('HENRY - ' + info.name);
                sessionStorage.setItem('restaurantId', info.id);
              },
              err => {
                this.patchState({ status: 'ERROR' });
                this.router.navigate(['notfound']);
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

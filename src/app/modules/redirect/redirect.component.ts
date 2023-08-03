import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap, tap } from 'rxjs';
import { RestaurantStore } from '../menu/services/restaurant.store';

@Component({
  selector: 'oxp-redirect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export default class RedirectComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private restaurantStore = inject(RestaurantStore);

  public redirect$ = this.route.params.pipe(
    filter(params => !!params['qrcode']),
    switchMap(params =>
      of(this.restaurantStore.load(params['qrcode'])).pipe(
        switchMap(() => this.restaurantStore.restaurantId$),
        tap(restaurantId => {
          this.router.navigate(['menu/' + params['qrcode'] + '/' + restaurantId]);
        })
      )
    )
  );
}

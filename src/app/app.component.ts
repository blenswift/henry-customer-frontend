import { DOCUMENT } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'oxp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);
  private angularFireMessaging = inject(AngularFireMessaging);
  private shoppingCartService = inject(ShoppingCartService);

  angularFireMessaging$ = this.angularFireMessaging.requestPermission.pipe(
    switchMap(() => this.angularFireMessaging.getToken),
    tap(token => this.shoppingCartService.fcmToken.next(token))
  );

  constructor(@Inject(DOCUMENT) private document: any) {
    const language = navigator.language.substring(0, 2);
    const languageExists = ['de', 'en'].includes(language);
    this.translateService.use(languageExists ? language : 'en');
    this.angularFireMessaging$.subscribe();
    this.elem = document;
  }

  elem: HTMLElement;

  ngOnInit() {
    this.openFullscreen();
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    }
  }
}

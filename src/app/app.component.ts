import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { OrderStore } from './modules/orders/services/order.store';
import { ShoppingCartStore } from './shared/services/shopping-cart.store';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';

@Component({
  selector: 'oxp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule],
  providers: [OrderStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);
  private shoppingCartStore = inject(ShoppingCartStore);

  constructor() {
    const language = navigator.language.substring(0, 2);
    const languageExists = ['de', 'en'].includes(language);
    this.translateService.use(languageExists ? language : 'en');
  }

  ngOnInit(): void {
    this.requestPermission();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then(currentToken => {
        if (currentToken) {
          this.shoppingCartStore.setFcmToken(currentToken);
          this.listen(messaging);
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen(messaging: Messaging) {
    onMessage(messaging, payload => {
      console.log('Message received. ', payload);
    });
  }
}

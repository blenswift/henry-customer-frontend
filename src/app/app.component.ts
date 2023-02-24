import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'oxp-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private translateService = inject(TranslateService);

  constructor() {
    const language = navigator.language.substring(0, 2);
    const languageExists = ['de', 'en'].includes(language);
    this.translateService.use(languageExists ? language : 'en');
  }
}

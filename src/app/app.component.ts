import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'abcall-frontend';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }
}

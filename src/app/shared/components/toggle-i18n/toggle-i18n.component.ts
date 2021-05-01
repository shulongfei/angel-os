import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { I18NService } from '../../services/i18n.service';

const Languages = {
  CN: 'zh-cn',
  EN: 'en-us'
}

@Component({
  selector: 'os-toggle-i18n',
  templateUrl: './toggle-i18n.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ToggleI18nComponent implements OnInit {

  language: string = '中文';

  constructor(
    public i18n:I18NService
  ) { }

  ngOnInit(): void {
    this.setLanguage();
  }

  setLanguage() {
    this.language = this.getLanguage() === Languages.CN ? 'English' : '中文';
  }

  toggleLanguage() {
    this.i18n.changeLanguage(
      this.getLanguage() === Languages.CN ? Languages.EN : Languages.CN
    );
  }

  getLanguage() {
    return this.i18n.language.toLowerCase();
  }

}

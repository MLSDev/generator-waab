import { Component} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app',
  templateUrl: 'app.component.pug'
})
export class AppMainComponent {
  constructor(
    private titleService: Title,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const pageTitle = activeRoute.children[0].snapshot.data.pageTitle || '<%= appName %>';
        titleService.setTitle(pageTitle);
      });
  }
}

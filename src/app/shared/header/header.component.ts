import { Component, HostListener, Input } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { Router, RouterModule } from '@angular/router';
import { MenutogglerComponent } from '../../main/shared/menutoggler/menutoggler.component';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    SearchbarComponent,
    UsermenuComponent,
    RouterModule,
    MenutogglerComponent,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUrl: string = '';
  mobile = false;
  menuOpened = false;
  menuState = 'in';
  threadchatState = 'out';
  legalPage = false;

  /**
   * The constructor for the HeaderComponent class.
   * It sets the currentUrl property to the current route, and calls the onResize method.
   * @param router The injected Router service.
   * @param stateService The injected StateService service.
   */
  constructor(private router: Router, private stateService: StateService) {
    this.currentUrl = this.router.url;
    this.onResize();
    this.isLegalPage();
  }

  /**
   * Handles window resize events.
   * When the window width is less than 900px, the menu is closed and the chat is full width.
  */
  @HostListener('window:resize', [])
  onResize(): void {
    this.mobile = window.innerWidth <= 900;
  }

  /**
   * Initializes the component by subscribing to the menuState$ observable of the StateService.
   * When the menuState$ observable emits a value, the menuState and menuOpened properties are updated accordingly.
   */
  ngOnInit(): void {
    this.stateService.menuState$.subscribe((state) => {
      this.menuState = state;
      this.menuOpened = state === 'in';
    });
  }

  /**
   * Toggles the menu state between 'in' and 'out'.
   * If the menu is opened, it is closed and vice versa.
   * The menuOpened property is updated after toggling the menuState.
   * The current menuState is also emitted to the menuState$ observable of the StateService.
   */
  toggleMenu(): void {
    this.menuState = this.menuState === 'in' ? 'out' : 'in';
    this.menuOpened = this.menuState === 'in';
    this.stateService.setMenuState(this.menuState);
  }


  /**
   * Checks if the current URL corresponds to a legal page.
   * A legal page is identified if the URL contains 'legalnotice' or 'imprint'.
   * Sets the `legalPage` property to `true` if it is a legal page, otherwise sets it to `false`.
   * Logs the result to the console.
   */
  isLegalPage(): void {
    if (
      this.currentUrl.includes('legalnotice') ||
      this.currentUrl.includes('imprint')
    ) {
      this.legalPage = true;
      
    } else {
      this.legalPage = false;
    }
  }
}

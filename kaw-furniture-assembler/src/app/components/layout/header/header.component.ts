import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {$} from "protractor";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu', {static:false}) menu: ElementRef;
  @ViewChild('mobile', {static:false}) mobile: ElementRef;

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.set_active();
      if (!$(this.mobile.nativeElement.children[0]).hasClass('hidden')) {
          $(this.mobile.nativeElement.children[0]).addClass('hidden');
      }
    });
  }

  ngOnInit(): void {
  }

  set_active(): void {
    let url = location.pathname.replace('/', '');
    if (url.length === 0) {
      url = 'home';
    }

    const menuElements = $(this.menu.nativeElement.children).children().toArray();
    const mobileElements = $(this.mobile.nativeElement.children).children().toArray();

    const menuId = url + '_c';
    const mobileId = url + '_m';
    this.check_active(menuElements, menuId);
    this.check_active(mobileElements, mobileId);
  }

  check_active(collection: any[], idToCheck: string): void {
    // tslint:disable-next-line:only-arrow-functions typedef
    collection.forEach(function(value) {
      const $val = $(value);
      const a = $val.children('a').toArray()[0];
      if (a.id === idToCheck) {
        if (!$val.hasClass('active')) {
          $val.addClass('active');
        }
      } else {
        if ($val.hasClass('active')) {
          $val.removeClass('active');
        }
      }
    });
  }

  make_menu_visible(): void {
      const list = $($(this.mobile.nativeElement.children).toArray()[0]);
      if (list.hasClass('hidden')) {
        list.removeClass('hidden');
      } else {
        list.addClass('hidden');
      }
  }
}

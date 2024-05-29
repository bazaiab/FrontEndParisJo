import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-services/auth-service/auth.service';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.scss']
})
export class ViewContactUsComponent {

  isSpinning = false;
  contacts: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getPlacedOrders();
  }

  getPlacedOrders() {
    this.authService.getAllContactUs().subscribe((res) => {
      this.contacts = res;
    })
  }

}

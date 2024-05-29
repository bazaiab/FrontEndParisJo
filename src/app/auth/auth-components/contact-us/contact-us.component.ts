import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-services/auth-service/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  signupForm!: FormGroup;
  isSpinning = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phone: [null, [Validators.required]],
      description: [null, [Validators.required]],
      subject: [null, [Validators.required]],
    });
  }


  onSubmit(): void {

    if (this.signupForm.valid) {
    
      this.authService.contactUs(this.signupForm.value).subscribe(
        (response) => {
          this.isSpinning = false;
          console.log(response);
          this.snackBar.open('Thank You for submission, our team will reach you soon.', 'Close', { duration: 5000 });
          // Navigate to the login page or perform any other action
          this.router.navigateByUrl("/login");
        },
        (error) => {
          this.isSpinning = false;
          this.snackBar.open('Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      );
    } else {
      for (const i in this.signupForm.controls) {
        this.signupForm.controls[i].markAsDirty();
        this.signupForm.controls[i].updateValueAndValidity();
      }
    }
  }
}

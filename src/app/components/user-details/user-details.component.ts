import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs/operators';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, LoadingComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
  user: User | undefined;
  supportText: string = '';
  loading: boolean = true; 

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const id = +this.route.snapshot.paramMap.get('userId')!;
    this.userService.getUserById(id)
    .pipe(delay(300))
    .subscribe(response => {
      this.user = response.data;
      this.supportText = response.support.text;
      this.loading = false; // Set loading to false after data is fetched
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
  
}

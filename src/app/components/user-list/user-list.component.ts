import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers : any[] = [];
  filteredUserId: number = 0;
  currentPage = 1;
  pageSize = 0;
  pageCount = 0;
  totalUsers = 0;
  totalPages = 0;
  pages: number[] = [];
  loading: boolean = true; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.filteredUserId.subscribe((userId) => {
      this.filteredUserId = +userId;
      this.fetchAllUsers();
    })
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(page: number): void {
    this.loading = true;
    this.userService.getUsers(page)
    .pipe(delay(200))
    .subscribe(response => {
      this.users = response.data;
      this.pageSize = response.per_page;
      this.totalPages = response.total_pages;
      this.totalUsers = response.total;
      this.pageCount = Math.ceil(this.totalUsers / this.pageSize);
      this.applyFilter();
      this.loading = false;
    });
  }

  applyFilter(): void {
    if (this.filteredUserId === 0) {
      this.filteredUsers = this.users.slice(0, this.pageSize);
      this.pageCount = Math.ceil(this.totalUsers / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.id === this.filteredUserId
      );
      this.pageCount = Math.ceil(this.filteredUsers.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }
  

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pageCount) {
      this.currentPage = page;
      this.fetchUsers(page);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.fetchUsers(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers(this.currentPage);
    }
  }
  
  fetchAllUsers(): void {
    this.loading = true;
    this.users = [];
    let page = 1;
    let totalPages = 1;
  
    const fetchNextPage = () => {
      this.userService.getUsers(page).subscribe(response => {
        this.users = this.users.concat(response.data);
        totalPages = response.total_pages; 
        page++; 
        if (page <= totalPages) {
          fetchNextPage(); 
        } else {
          this.loading = false;
          this.applyFilter();
        }
      });
    };
  
    fetchNextPage();
  }
  

}
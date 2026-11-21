import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-head-bar',
  styleUrls: ['./head-bar.css'],
  templateUrl: './head-bar.html',
})
export class HeadBar {
  faHeart = faHeart;
  private router = inject(Router);
  public movieService = inject(MovieService);

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToWishList() {
    this.router.navigate(['/wishlist']);
  }
}

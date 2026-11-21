import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faTrash, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-wish-list',
  styleUrl: './wish-list.css',
  templateUrl: './wish-list.html',
})
export class WishList {
  router = inject(Router);
  movieService = inject(MovieService);

  faHeart = faHeart;
  faTrash = faTrash;
  faStar = faStar;
  faArrowLeft = faArrowLeft;

  navigateTo(movie: Movie) {
    this.router.navigate(['/', movie.id]);
  }

  removeFromWishList(id: number, event: Event) {
    event.stopPropagation();
    this.movieService.removeFromWishList(id);
  }

  exploreMovies() {
    this.router.navigate(['/']);
  }
}

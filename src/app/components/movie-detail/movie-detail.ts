import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.css',
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public movieService = inject(MovieService);

  faHeart = faHeart;
  faStar = faStar;
  faArrowLeft = faArrowLeft;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.movieService.getMovieById(id);
        })
      )
      .subscribe((movie) => this.movieService.selectedMovie.set(movie));
  }

  backToMovieList() {
    this.router.navigate(['/']);
  }

  toggleWish(movie: Movie | null) {
    if (movie) {
      this.movieService.toggleWishList(movie);
    }
  }

  addToWish(movie: Movie | null) {
    this.toggleWish(movie);
  }

  addToWishList(movie: Movie | null) {
    this.toggleWish(movie);
  }
}

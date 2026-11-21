import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-movie-list',
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {
  router = inject(Router);
  movieService = inject(MovieService);

  faHeart = faHeart;
  faStar = faStar;
  faPlay = faPlay;

  sortBy = signal<string>('default');

  ngOnInit(): void {
    if (this.movieService.movieList().length === 0) {
      this.movieService
        .getMovieList()
        .subscribe((response) => this.movieService.movieList.set(response));
    }
  }

  getFeaturedMovie(): Movie | null {
    if (this.movieService.searchQuery() !== '') {
      return null;
    }
    const list = this.movieService.movieList();
    return list.length > 0 ? list[0] : null;
  }

  getSortedMovies(): Movie[] {
    const list = this.movieService.movieList();
    if (this.sortBy() === 'rating') {
      return [...list].sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
    }
    if (this.sortBy() === 'date') {
      return [...list].sort((a, b) =>
        (b.release_date || '').localeCompare(a.release_date || '')
      );
    }
    if (this.sortBy() === 'title') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }

  setSort(sort: string) {
    this.sortBy.set(sort);
  }

  navigateTo(movie: Movie) {
    this.router.navigate(['/', movie.id]);
  }

  toggleWish(movie: Movie, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.movieService.toggleWishList(movie);
  }
}

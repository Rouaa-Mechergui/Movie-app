import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;

  movieService = inject(MovieService);
  private router = inject(Router);

  getMovieByTitle(title: string) {
    const trimmed = title.trim();
    this.movieService.searchQuery.set(trimmed);

    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }

    if (trimmed === '') {
      this.movieService.getMovieList().subscribe((response) => {
        this.movieService.movieList.set(response);
      });
    } else {
      this.movieService.getMovieByTitle(trimmed).subscribe((response) => {
        this.movieService.movieList.set(response);
      });
    }
  }

  clearSearch(inputElement: HTMLInputElement) {
    inputElement.value = '';
    this.getMovieByTitle('');
  }
}

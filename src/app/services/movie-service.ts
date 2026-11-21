import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../interfaces/movie';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.url_api;
  private readonly key = environment.apiKey;
  private readonly movieURL = environment.url_movie_api;

  private loadWishListFromStorage(): Movie[] {
    try {
      const saved = localStorage.getItem('wishList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  public movieList = signal<Movie[]>([]);
  public selectedMovie = signal<Movie | null>(null);
  public wishList = signal<Movie[]>(this.loadWishListFromStorage());
  public searchQuery = signal<string>('');
  public toastMessage = signal<string | null>(null);
  private toastTimer: any = null;

  getMovieList(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.url}?api_key=${this.key}`)
      .pipe(map((response) => response.results));
  }

  getMovieById(id: number): Observable<Movie> {
    const baseUrl = this.movieURL.endsWith('/')
      ? this.movieURL.slice(0, -1)
      : this.movieURL;
    return this.http.get<Movie>(`${baseUrl}/${id}?api_key=${this.key}`);
  }

  getMovieByTitle(title: string): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          title
        )}&api_key=${this.key}`
      )
      .pipe(map((response) => response.results));
  }

  showToast(message: string) {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastMessage.set(message);
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set(null);
    }, 2500);
  }

  isInWishList(movieId: number): boolean {
    return this.wishList().some((m) => m.id === movieId);
  }

  addToWishList(movie: Movie) {
    if (!this.isInWishList(movie.id)) {
      this.wishList.update((list) => [...list, movie]);
      localStorage.setItem('wishList', JSON.stringify(this.wishList()));
      this.showToast(`"${movie.title}" added to your Wishlist`);
    }
  }

  removeFromWishList(movieId: number) {
    const movie = this.wishList().find((m) => m.id === movieId);
    const title = movie ? `"${movie.title}"` : 'Movie';
    this.wishList.update((list) => list.filter((m) => m.id !== movieId));
    localStorage.setItem('wishList', JSON.stringify(this.wishList()));
    this.showToast(`${title} removed from Wishlist`);
  }

  toggleWishList(movie: Movie) {
    if (this.isInWishList(movie.id)) {
      this.removeFromWishList(movie.id);
    } else {
      this.addToWishList(movie);
    }
  }
}

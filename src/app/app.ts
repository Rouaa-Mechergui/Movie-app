import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { HeadBar } from './components/head-bar/head-bar';
import { SearchBar } from './components/search-bar/search-bar';
import { MovieService } from './services/movie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadBar, SearchBar, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('movie-app');
  public movieService = inject(MovieService);
  faHeart = faHeart;
}

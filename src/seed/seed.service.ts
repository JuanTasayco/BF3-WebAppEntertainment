import { Injectable } from '@nestjs/common';
import { movies } from './data/info-pelis.data';
import { MoviesService } from 'src/movies/movies.service';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

@Injectable()
export class SeedService {
  constructor(private moviesService: MoviesService) {}

  getData() {
    this.logicInfoEndpoint();
  }

  async logicInfoEndpoint() {
    const moviesPromises: Promise<CreateMovieDto>[] = [];
    movies.forEach((movie) => {
      moviesPromises.push(this.moviesService.create(movie));
    });
    
    Promise.all(moviesPromises);
    return movies;
  }
}

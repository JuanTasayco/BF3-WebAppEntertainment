import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './entities/movie.entity';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private dbMovies: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const movie = await this.dbMovies.create(createMovieDto);

      return movie;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    try {
      const movies = await this.dbMovies.find();
      return movies;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(termino: string) {
    try {
      let movie: CreateMovieDto;

      movie = await this.dbMovies.findById({ _id: termino });

      if (!movie) {
        movie = await this.dbMovies.findOne({ title: termino });
      }

      if (!movie) throw new BadRequestException('Pelicula no existe');

      return movie;
    } catch (error) {
      return error;
    }
  }

  async updateStatusFavorite(id: string, updateMovieDto: UpdateMovieDto) {
    const movie: Movie = await this.findOne(id);

    try {
      await this.dbMovies.updateOne(
        { _id: id },
        {
          $set: { isBookmarked: movie.isBookmarked ? false : true },
          $currentDate: {
            lastUpdated: true,
          },
        },
      );
      /* solo para visualmente ver el resultado actual de la propiedad en la response del método */
      movie.isBookmarked = !movie.isBookmarked;
      return movie;
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies; // this is a fake DB
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id); // this is a fake DB
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id); // this is a fake DB
    return true;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}

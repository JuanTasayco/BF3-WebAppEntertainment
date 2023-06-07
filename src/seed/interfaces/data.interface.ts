import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class Movie {
    title: string;
    thumbnail: Thumbnail;
    year: number;
    category: Category;
    rating: Rating;
    isBookmarked: boolean;
    isTrending: boolean;
}

export enum Category {
    Movie = "Movie",
    TVSeries = "TV Series",
}

export enum Rating {
    E = "E",
    PG = "PG",
    The18 = "18+",
}

export class Thumbnail {
    trending?: Regular;
    regular?: Trending;
}

export class Regular {
    small?: string;
    medium?: string;
    large?: string;
}

export class Trending {
    small?: string;
    large?: string;
}
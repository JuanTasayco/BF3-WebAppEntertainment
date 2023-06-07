import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Thumbnail } from "src/seed/interfaces/data.interface";

export class CreateMovieDto {

    @IsString()
    title: string;

    @IsOptional()
    thumbnail: Thumbnail;

    @IsNumber()
    year: number;

    @IsString()
    @IsIn(["Movie", "TV Series"])
    category: string;

    @IsIn(["E", "PG", "18+"])
    rating: string;

    @IsBoolean()
    isBookmarked: boolean;

    @IsBoolean()
    isTrending: boolean;

}

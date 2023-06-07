import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thumbnail } from 'src/seed/interfaces/data.interface';

@Schema()
export class Movie {
  @Prop({ unique: true, type: String })
  title: string;

  @Prop({ type: String })
  name: string;

  @Prop()
  thumbnail: Thumbnail;

  @Prop({ type: Number })
  year: number;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  rating: string;

  @Prop({ type: Boolean })
  isBookmarked: boolean;

  @Prop({ type: Boolean })
  isTrending: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

MovieSchema.pre('save', function (next) {
  if (!this.name) {
    this.name = this.title.toString().replaceAll(' ', '');
  };

  next();
});

import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Comment extends Model {
  static table = 'comments';

  @field('body') body!: string;
  @field('post_id') postId!: string;
  @field('is_favorite') isFavorite !: boolean
}

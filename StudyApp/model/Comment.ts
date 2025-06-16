import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

export default class Comment extends Model {
  static table = 'comments';

  @field('body') body!: string;
  @field('post_id') postId!: string;
  @field('is_favorite') isFavorite !: boolean
  @readonly @date('created_at') createdAt !: Date
  @readonly @date('updated_at') updatedAt !: Date
}

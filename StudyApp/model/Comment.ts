import { Model } from '@nozbe/watermelondb';
import { date, field } from '@nozbe/watermelondb/decorators';

export default class Comment extends Model {
  static table = 'comments';

  @field('body') body!: string;
  @field('post_id') postId!: string;
  @field('is_favorite') isFavorite !: boolean
  @date('created_at') createdAt !: Date
  @date('updated_at') updatedAt !: Date
  @field('user_id') userId!: string;

}

import { Model, Relation } from '@nozbe/watermelondb';
import { children, date, field, text } from '@nozbe/watermelondb/decorators';
import Comment from './Comment';

export default class Post extends Model {
  static table = 'posts'

  static associations: {
    comments: {
      type: 'has_many';
      foreignKey: string;
    };
  } = {
      comments: {
        type: 'has_many',
        foreignKey: 'post_id',
      },
    };


  @text('title') title !: string
  @text('subtitle') subtitle !: string
  @text('body') body !: string
  @field('is_pinned') isPinned !: boolean
  @date('created_at') createdAt !: Date
  @date('updated_at') updatedAt !: Date
  @field('user_id') userId!: string;
  @field('last_modified') lastModified!: number

  @children('comments') comments!: Relation<Comment>;
}

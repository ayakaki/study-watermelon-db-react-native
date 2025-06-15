import { Model, Relation } from '@nozbe/watermelondb';
import { children, field, text } from '@nozbe/watermelondb/decorators';
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

  @children('comments') comments!: Relation<Comment>;
}

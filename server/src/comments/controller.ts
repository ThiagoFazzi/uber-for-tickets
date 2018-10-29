import { JsonController, NotFoundError, Get, Post, Param, HttpCode, Body, Patch, Authorized } from 'routing-controllers';
import Comment from './entity';

@JsonController()
export default class CommentController {

    @Get('/comments')
    async allComments() {
      const comments = await Comment.find()
      return { comments }
    }

    @Get('/comments/:id')
    getComment(
        @Param('id') id: number
    ) {
        return Comment.findOne(id)
    }

    @Authorized()
    @Patch('/comments/:id')
    async updateComment(
      @Param('id') id: number,
      @Body() update: Comment
    ) {
      const comment = await Comment.findOne(id)
      if (!comment) throw new NotFoundError('Cannot find comment')
    
      return Comment.merge(comment, update).save()
    }

    @Authorized()
    @Post('/comments')
    @HttpCode(201)
    createComment(
      @Body() comment: Comment
    ) {
      return comment.save()
    }
}
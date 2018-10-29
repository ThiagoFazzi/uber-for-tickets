import { JsonController, Post, Param, Get, Body, NotFoundError, Put, Authorized } from 'routing-controllers';
import User from './entity';

@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @Body() data: User
  ) {
    const {password, ...rest} = data
    const entity = User.create(rest)
    await entity.setPassword(password)
    const user = await entity.save()
    return user
  }

  @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOne(id)
  }

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }

  @Authorized()
  @Put('/users/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() update: Partial<User>
  ) {
    const user = await User.findOne(id)
    if (!user) throw new NotFoundError('Cannot find ticket')
  
    return User.merge(user, update).save()
  }
}

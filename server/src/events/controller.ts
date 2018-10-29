import { JsonController, NotFoundError, Get, Patch, Post, Param, HttpCode, Body } from 'routing-controllers';
import Event from './entity';

@JsonController()
export default class EventController {

    @Get('/events')
    async allEvents() {
      const events = await Event.find()
      return  events 
    }

    @Get('/events/:id')
    async getEvent(
        @Param('id') id: number
    ) {
  
      return Event.findOne(id)
    }

    //@Authorized()
    @Patch('/events/:id')
    async updateEvent(
      @Param('id') id: number,
      @Body() update: Partial<Event>
    ) {
      const event = await Event.findOne(id)
      if (!event) throw new NotFoundError('Cannot find page')
    
      return Event.merge(event, update).save()
    }

    //@Authorized()
    @Post('/events')
    @HttpCode(201)
    async createEvent(
      @Body() event: Event
    ) {
      const newEvent = await event.save()

      return await Event.findOne(newEvent.id)
    }
}
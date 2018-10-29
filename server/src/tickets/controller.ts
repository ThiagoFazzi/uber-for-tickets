import { JsonController, NotFoundError, Get, Post, Param, HttpCode, Body, Patch, Authorized } from 'routing-controllers';
import Ticket from './entity';



@JsonController()
export default class TicketController {

    @Get('/tickets')
    async allTickets() {
      const tickets = await Ticket.find()
      return { tickets }
    }


    @Get('/tickets/:id')
    async getTicket(
        @Param('id') id: number
    ) {

      //Start risk algoritm
      const ticket = await Ticket.findOne({  
        relations: ["event"], 
        where: { id: id} 
      })
      if (!ticket) throw new NotFoundError('Cannot find ticket')
      
      const ticketsByUser = await Ticket.find({ where: { user: ticket.user.id} }) 
      if (!ticketsByUser) throw new NotFoundError('Cannot find tickets by this user')
      
      const ticketsCount = ticketsByUser.length
      if(ticketsCount === 1){
        ticket.risk += 10
      }

      const ticketsByEvent = await Ticket.find({  
        select: ["price"], 
        where: { event: ticket.event.id} 
      })
      if (!ticketsByEvent) throw new NotFoundError('Cannot find tickets by event') 

      const priceTicketsByEvent = ticketsByEvent.map(ticket => (ticket.price))
      const countTicketsByEvent = priceTicketsByEvent.length
       
      const avgTicketsPriceByEvent = (priceTicketsByEvent.reduce((a,b) => Number(a) + Number(b))/countTicketsByEvent).toFixed(2)

      if(Number(ticket.price) > Number(avgTicketsPriceByEvent)){
        const encrease = Number(ticket.price) - Number(avgTicketsPriceByEvent)
        const howPercentEncrease = ((encrease/Number(avgTicketsPriceByEvent))*100).toFixed(2)
        if(Number(howPercentEncrease) > 10){
          ticket.risk -= 10  
        }
        else if(Number(howPercentEncrease) < 10){
          ticket.risk -= Number(howPercentEncrease)
        }
      }
      else if(Number(ticket.price) < Number(avgTicketsPriceByEvent)){
        const decrease = Number(avgTicketsPriceByEvent) - Number(ticket.price)
        const howPercentDecrease = ((decrease/Number(avgTicketsPriceByEvent))*100).toFixed(2)
        ticket.risk += Number(howPercentDecrease)
      }
    

      const hour = ticket.time.getHours()
      if(hour >= 9 && hour <= 17){
        ticket.risk -= 10
      }
      else if(hour < 9 || hour > 17){
        ticket.risk += 10
      }

      if (!ticket.comments) throw new NotFoundError('Cannot find comment by this ticket') 
      if((ticket.comments).length > 3){
        ticket.risk += 5
      }


      if(ticket.risk < 5){
        ticket.risk = 5
      }
      else if(ticket.risk > 95){
        ticket.risk = 95
      }
    //End risk algoritm

      return ticket
    }

    @Authorized()
    @Patch('/tickets/:id')
    async updateTicket(
      @Param('id') id: number,
      @Body() update: Partial<Ticket>
    ) {
      const ticket = await Ticket.findOne(id)
      if (!ticket) throw new NotFoundError('Cannot find ticket')
    
      return Ticket.merge(ticket, update).save()
    }

    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
    createTicket(
      @Body() ticket: Ticket
    ) {
      return ticket.save()
    }
}
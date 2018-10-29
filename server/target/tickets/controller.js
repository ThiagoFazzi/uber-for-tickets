"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
let TicketController = class TicketController {
    async allTickets() {
        const tickets = await entity_1.default.find();
        return { tickets };
    }
    async getTicket(id) {
        const ticket = await entity_1.default.findOne({
            relations: ["event"],
            where: { id: id }
        });
        if (!ticket)
            throw new routing_controllers_1.NotFoundError('Cannot find ticket');
        const ticketsByUser = await entity_1.default.find({ where: { user: ticket.user.id } });
        if (!ticketsByUser)
            throw new routing_controllers_1.NotFoundError('Cannot find tickets by this user');
        const ticketsCount = ticketsByUser.length;
        if (ticketsCount === 1) {
            ticket.risk += 10;
        }
        const ticketsByEvent = await entity_1.default.find({
            select: ["price"],
            where: { event: ticket.event.id }
        });
        if (!ticketsByEvent)
            throw new routing_controllers_1.NotFoundError('Cannot find tickets by event');
        const priceTicketsByEvent = ticketsByEvent.map(ticket => (ticket.price));
        const countTicketsByEvent = priceTicketsByEvent.length;
        const avgTicketsPriceByEvent = (priceTicketsByEvent.reduce((a, b) => Number(a) + Number(b)) / countTicketsByEvent).toFixed(2);
        if (Number(ticket.price) > Number(avgTicketsPriceByEvent)) {
            const encrease = Number(ticket.price) - Number(avgTicketsPriceByEvent);
            const howPercentEncrease = ((encrease / Number(avgTicketsPriceByEvent)) * 100).toFixed(2);
            if (Number(howPercentEncrease) > 10) {
                ticket.risk -= 10;
            }
            else if (Number(howPercentEncrease) < 10) {
                ticket.risk -= Number(howPercentEncrease);
            }
        }
        else if (Number(ticket.price) < Number(avgTicketsPriceByEvent)) {
            const decrease = Number(avgTicketsPriceByEvent) - Number(ticket.price);
            const howPercentDecrease = ((decrease / Number(avgTicketsPriceByEvent)) * 100).toFixed(2);
            ticket.risk += Number(howPercentDecrease);
        }
        const hour = ticket.time.getHours();
        if (hour >= 9 && hour <= 17) {
            ticket.risk -= 10;
        }
        else if (hour < 9 || hour > 17) {
            ticket.risk += 10;
        }
        if (!ticket.comments)
            throw new routing_controllers_1.NotFoundError('Cannot find comment by this ticket');
        if ((ticket.comments).length > 3) {
            ticket.risk += 5;
        }
        if (ticket.risk < 5) {
            ticket.risk = 5;
        }
        else if (ticket.risk > 95) {
            ticket.risk = 95;
        }
        return ticket;
    }
    async updateTicket(id, update) {
        const ticket = await entity_1.default.findOne(id);
        if (!ticket)
            throw new routing_controllers_1.NotFoundError('Cannot find ticket');
        return entity_1.default.merge(ticket, update).save();
    }
    createTicket(ticket) {
        return ticket.save();
    }
};
__decorate([
    routing_controllers_1.Get('/tickets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "allTickets", null);
__decorate([
    routing_controllers_1.Get('/tickets/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTicket", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/tickets/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateTicket", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/tickets'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "createTicket", null);
TicketController = __decorate([
    routing_controllers_1.JsonController()
], TicketController);
exports.default = TicketController;
//# sourceMappingURL=controller.js.map
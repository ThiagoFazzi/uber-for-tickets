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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("typeorm/repository/BaseEntity");
const class_validator_1 = require("class-validator");
const entity_1 = require("../users/entity");
const entity_2 = require("../events/entity");
const entity_3 = require("../comments/entity");
let Ticket = class Ticket extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "imageUrl", void 0);
__decorate([
    typeorm_1.Column('numeric', { nullable: false }),
    __metadata("design:type", Number)
], Ticket.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('int', { default: 5, nullable: false }),
    __metadata("design:type", Number)
], Ticket.prototype, "risk", void 0);
__decorate([
    typeorm_1.Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Ticket.prototype, "time", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(10),
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, user => user.tickets, { eager: true }),
    __metadata("design:type", entity_1.default)
], Ticket.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_2.default, event => event.tickets),
    __metadata("design:type", entity_2.default)
], Ticket.prototype, "event", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_3.default, comment => comment.ticket, { eager: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "comments", void 0);
Ticket = __decorate([
    typeorm_1.Entity()
], Ticket);
exports.default = Ticket;
//# sourceMappingURL=entity.js.map
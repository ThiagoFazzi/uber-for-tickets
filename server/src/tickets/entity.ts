import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength } from 'class-validator'
import User from '../users/entity';
import Event from '../events/entity';
import Comment from '../comments/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: true })
  imageUrl: string

  @Column('numeric', { nullable: false })
  price: number

  @Column('int', {default: 5, nullable: false })
  risk: number

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP'})
  time: Date

  @IsString()
  @MinLength(10)
  @Column('text', { nullable: true })
  description: string

  @ManyToOne(_ => User, user => user.tickets, {eager:true})
  user: User

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  @OneToMany(_ => Comment, comment => comment.ticket, {eager: true}) 
  comments?: Comment[]

}

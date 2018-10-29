import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'
import User from '../users/entity';
import Ticket from '../tickets/entity';


@Entity()
//@Index(['user'], {unique:false})
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 25)
  @Column('text', { nullable: false })
  name: string

  @IsString()
  @MinLength(10)
  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  imageUrl: string

  @Column('date', { nullable: false })
  dateStart: Date

  @Column('date', { nullable: false })
  dateEnd: Date

  @ManyToOne(_ => User, user => user.events, {eager: true})
  user: User

  @OneToMany(_ => Ticket, ticket => ticket.event, {eager: true}) 
  tickets?: Ticket[]
}

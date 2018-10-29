import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength } from 'class-validator'
import User from '../users/entity';
import Ticket from '../tickets/entity';

@Entity()
//@Index(['user', 'ticket'], {unique:false})
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(10)
  @Column('text', { nullable: true })
  title: string

  @IsString()
  @MinLength(10)
  @Column('text', { nullable: true })
  description: string

  @Column('date', { nullable: false })
  date: Date

  @ManyToOne(_ => User, user => user.comments, {eager: true})
  user: User

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket

}

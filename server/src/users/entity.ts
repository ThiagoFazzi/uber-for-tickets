import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer';
import { MinLength, IsString, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt'
import Ticket from '../tickets/entity'
import Event from '../events/entity'
import Comment from '../comments/entity'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @Column('text', {default: 'url'})
  avatar: string

  @IsString()
  @MinLength(8)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(_ => Event, event => event.user)
  events?: Event[]

  @OneToMany(_ => Ticket, ticket => ticket.user) 
  tickets?: Ticket[]

  @OneToMany(_ => Comment, comment => comment.user) 
  comments?: Comment[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

}

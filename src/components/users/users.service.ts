import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../contacts/entities/contact.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) { }
  async create(user: User): Promise<User> {

    const newUser = await this.userRepository.save(user);

    const contact = new Contact();
    contact.name = newUser.name;
    contact.phoneNumber = newUser.phoneNumber;
    contact.user = newUser;

    await this.contactRepository.save(contact);

    return newUser
  }

  async validateUser(phoneNumber: string, password: string) {
    const user = await this.findByPhoneNumber(phoneNumber);
    if (!password) {
      throw new BadRequestException("Passwod needed")

    }

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const result = await this.userRepository.findOne({ where: { phoneNumber } });
    return result

  }
  async findById(id: number, session: any): Promise<User | null> {
    const data = await this.userRepository.findOne({ where: { id } });
    return data
  }




}

import { Injectable } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    
  ) {}
  
  async create(contact: Contact): Promise<Contact> {
    return this.contactRepository.save(contact);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Contact | null> {
    return this.contactRepository.findOne({ where: { phoneNumber } });
  }



}

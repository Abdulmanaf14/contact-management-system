import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSpamStatusDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

  ) { }

  async create(contact: Contact) {
    return this.contactRepository.save(contact);
  }

  async findByPhoneNumber(phoneNumber: string){
    return await this.contactRepository.findOne({ where: { phoneNumber } });
  }
  async updateSpamStatus(phoneNumber,updateSpamStatus: UpdateSpamStatusDto, session: any) {
    if (!session.userId) {
      throw new BadRequestException('Not logged in.');
    }
    

    const contact = await this.contactRepository.findOne({ where: { phoneNumber } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    contact.isSpam = updateSpamStatus.isSpam;
    return this.contactRepository.save(contact);
  }
  async searchByPhoneNumber(phoneNumber: string,session: any): Promise<Contact[]> {

    if (!session.userId) {
      throw new BadRequestException('Not logged in.');
    }
    
    return this.contactRepository.find({
      where: { phoneNumber }
    });
  }


  async searchByName(name: string,session:any) {
    
    console.log(`Searching contacts with name: ${name}`);
    if(!session.accessToken){
      throw new BadRequestException('not logged in')
    }
    
    const contactname = this.contactRepository.createQueryBuilder('contact')
    .where('contact.name LIKE :nameStart', { nameStart: `${name}%` })
      .orWhere('contact.name LIKE :nameContain', { nameContain: `%${name}%` })
      .orderBy('CASE WHEN contact.name LIKE :nameStart THEN 1 ELSE 2 END', 'ASC')
      .setParameters({ nameStart: `${name}%`, nameContain: `%${name}%` })
      .getMany();
      console.log(`Found contacts: ${JSON.stringify(contactname, null, 2)}`);
      return contactname
      
  }


    

 



}

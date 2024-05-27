import { UpdateSpamStatusDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
export declare class ContactsService {
    private readonly contactRepository;
    constructor(contactRepository: Repository<Contact>);
    create(contact: Contact): Promise<Contact>;
    findByPhoneNumber(phoneNumber: string): Promise<Contact | null>;
    updateSpamStatus(phoneNumber: any, updateSpamStatus: UpdateSpamStatusDto, session: any): Promise<Contact>;
    searchByPhoneNumber(phoneNumber: string, session: any): Promise<Contact[]>;
    searchByName(name: string, session: any): Promise<Contact[]>;
}

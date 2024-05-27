import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { AuthService } from 'src/auth/auth.service';
import { UpdateSpamStatusDto } from './dto/update-contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    private readonly authService;
    constructor(contactsService: ContactsService, authService: AuthService);
    create(contact: Contact, session: Record<string, any>, request: Request): Promise<Contact>;
    updateSpamStatus(phoneNumber: string, updateSpamStatusDto: UpdateSpamStatusDto, session: Record<string, any>): Promise<Contact>;
    searchByPhoneNumber(phoneNumber: string, session: Record<string, any>): Promise<any>;
    searchByName(name: string, session: Record<string, any>): Promise<any>;
}

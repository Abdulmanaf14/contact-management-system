import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Contact } from '../contacts/entities/contact.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly contactRepository;
    constructor(userRepository: Repository<User>, contactRepository: Repository<Contact>);
    create(user: User): Promise<User>;
    validateUser(phoneNumber: string, password: string): Promise<User | null>;
    findByPhoneNumber(phoneNumber: string): Promise<User | null>;
    findById(id: number, session: any): Promise<User | null>;
}

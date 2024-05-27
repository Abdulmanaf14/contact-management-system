import { User } from 'src/components/users/entities/user.entity';
export declare class Contact {
    id: number | undefined;
    name: string | undefined;
    phoneNumber: string | undefined;
    isSpam: boolean | undefined;
    user?: User;
}

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    register(user: User): Promise<User>;
    login(loginDto: {
        phoneNumber: string;
        password: string;
    }, session: any): Promise<any>;
    getProfile(session: Record<string, any>): Promise<Record<string, any>>;
    logout(session: Record<string, any>): Promise<string>;
}

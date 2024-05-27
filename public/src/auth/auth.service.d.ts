export declare class AuthService {
    private readonly secretKey;
    generateAccessToken(userId: number): string;
    verifyAccessToken(token: string): {
        userId: number;
    };
}

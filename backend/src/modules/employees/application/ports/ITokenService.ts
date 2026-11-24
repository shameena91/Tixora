export interface ITokenService {
  generateToken(): string;
  hashToken(token: string): string;
}
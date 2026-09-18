declare global {
  namespace Express {
    interface Request {
      user?: {
        accountId: string;
        email: string;
           role: AccountRole;
      };
    }
  }
}

export {};
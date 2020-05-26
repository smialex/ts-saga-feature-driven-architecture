type TToken = string | null;

class AuthServiceSingletone {
  private accessToken: TToken;
  private refreshToken: TToken;
  private subscribers: Array<() => void>;

  private emit() {
    this.subscribers.forEach((cb) => cb());
  }

  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.subscribers = [];
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  setTokensPair(accessToken: TToken, refreshToken: TToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.emit();
  }

  resetTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.emit();
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: () => void) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }
}

export const AuthService = new AuthServiceSingletone();

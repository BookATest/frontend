export default class Token {
  protected get cacheKey(): string {
    return 'token';
  }

  protected token: string | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.token = JSON.parse(json) || undefined;
  }

  public get get(): string | undefined {
    return this.token;
  }

  public cache(token: any): Token {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(token));

    return this;
  }

  public clear(): Token {
    window.sessionStorage.removeItem(this.cacheKey);

    return this;
  }
}

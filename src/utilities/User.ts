export default class User {
  protected get cacheKey(): string {
    return 'user';
  }

  protected user: string | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.user = JSON.parse(json) || undefined;
  }

  public get get(): string | undefined {
    return this.user;
  }

  public cache(user: any): User {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(user));

    return this;
  }

  public clear(): User {
    window.sessionStorage.removeItem(this.cacheKey);

    return this;
  }
};

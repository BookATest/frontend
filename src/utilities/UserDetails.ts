export default class UserDetails {
  protected get cacheKey(): string {
    return 'user_details';
  }

  protected userDetails: string | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.userDetails = JSON.parse(json) || undefined;
  }

  public get get(): string | undefined {
    return this.userDetails;
  }

  public cache(userDetails: any): UserDetails {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(userDetails));

    return this;
  }

  public clear(): UserDetails {
    window.sessionStorage.removeItem(this.cacheKey);

    return this;
  }
};

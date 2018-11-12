export default class ServiceUser {
  protected get cacheKey(): string {
    return 'service_user';
  }

  protected serviceUser: string | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.serviceUser = JSON.parse(json) || undefined;
  }

  public get get(): string | undefined {
    return this.serviceUser;
  }

  public cache(serviceUser: any): ServiceUser {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(serviceUser));

    return this;
  }

  public clear(): ServiceUser {
    window.sessionStorage.removeItem(this.cacheKey);

    return this;
  }
}

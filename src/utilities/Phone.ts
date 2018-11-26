export default class Phone {
  protected get cacheKey(): string {
    return 'phone';
  }

  protected phone: string | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.phone = JSON.parse(json) || undefined;
  }

  public get get(): string | undefined {
    return this.phone;
  }

  public cache(phone: any): Phone {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(phone));

    return this;
  }

  public clear(): Phone {
    window.sessionStorage.removeItem(this.cacheKey);

    return this;
  }
}

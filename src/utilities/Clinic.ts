export default class Clinic {
  protected get cacheKey(): string {
    return 'clinic';
  }

  protected clinic: string | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.clinic = JSON.parse(json) || undefined;
  }

  public get get(): string | undefined {
    return this.clinic;
  }

  public cache(clinic: any): Clinic {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(clinic));

    return this;
  }
};

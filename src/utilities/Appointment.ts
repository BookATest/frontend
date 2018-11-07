export default class Appointment {
  protected get cacheKey(): string {
    return 'appointment';
  }

  protected appointment: string | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.appointment = JSON.parse(json) || undefined;
  }

  public get get(): string | undefined {
    return this.appointment;
  }

  public cache(appointment: any): Appointment {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(appointment));

    return this;
  }

  public clear(): Appointment {
    window.sessionStorage.removeItem(this.cacheKey);

    return this;
  }
};

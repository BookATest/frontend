import SettingsInterface from "@/utilities/SettingsInterface";
import http from "@/http";

export default class Settings {
  public static async create(): Promise<Settings> {
    const settings = new Settings();

    if (!settings.isCached) {
      settings.cache(await settings.fetch());
    }

    return settings;
  }

  protected constructor() {
    //
  }

  protected get sessionStorageKey(): string {
    return 'api_settings';
  }

  protected get isCached(): boolean {
    return window.sessionStorage.getItem(this.sessionStorageKey) !== null;
  }

  protected cache(settings: SettingsInterface): Settings {
    window.sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(settings));

    return this;
  }

  protected async fetch(): Promise<SettingsInterface> {
    const response = await http.get('/v1/settings');
    const data = response.data.data;

    return {
      default_appointment_booking_threshold: data.default_appointment_booking_threshold,
      default_appointment_duration: data.default_appointment_duration,
      language: data.language,
      name: data.name,
      primary_colour: data.primary_colour,
      secondary_colour: data.secondary_colour,
    };
  }

  protected load(): SettingsInterface {
    return JSON.parse(window.sessionStorage.getItem(this.sessionStorageKey) || '{}');
  }

  public get name(): string {
    return this.load().name;
  }
}

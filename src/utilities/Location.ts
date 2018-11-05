import Coordinate from "@/utilities/Coordinate";

export default class Location {
  protected get postcodeCacheKey(): string {
    return 'postcode';
  }

  protected get coordinateCacheKey(): string {
    return 'coordinate';
  }

  protected postcode: string | undefined;
  protected coordinate: Coordinate | undefined;

  public constructor() {
    const postcodeJson: string = window.sessionStorage.getItem(this.postcodeCacheKey) || '""';
    this.postcode = JSON.parse(postcodeJson) || undefined;

    const coordinateJson: string = window.sessionStorage.getItem(this.coordinateCacheKey) || '""';
    this.coordinate = JSON.parse(coordinateJson) || undefined;
  }

  public get getPostcode(): string | undefined {
    return this.postcode;
  }

  public get getCoordinate(): Coordinate | undefined {
    return this.coordinate;
  }

  public cache(location: string | Coordinate): Location {
    if (typeof(location) === 'string') {
      window.sessionStorage.setItem(this.postcodeCacheKey, JSON.stringify(location));
    } else {
      window.sessionStorage.setItem(this.coordinateCacheKey, JSON.stringify(location));
    }

    return this;
  }
};

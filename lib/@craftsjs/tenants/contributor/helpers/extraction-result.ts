export class ExtractionResult {
  public IsMatch: boolean;
  public Matches: any[];

  constructor(isMatch: boolean) {
    this.IsMatch = isMatch;
    this.Matches = [];
  }
}

import { FormatStringTokenType } from './format-string-token-type';

export class FormatStringToken {
  public Text: string;

  public Type: FormatStringTokenType;

  constructor(text: string, type: FormatStringTokenType) {
    this.Text = text;
    this.Type = type;
  }
}

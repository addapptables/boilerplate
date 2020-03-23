import { ExtractionResult } from './extraction-result';
import { FormatStringTokenizer } from './format-string-tokenizer';
import { FormatStringTokenType } from './format-string-token-type';

export class FormattedStringValueExtracter {
  Extract(str: string, format: string): ExtractionResult {
    if (str === format) {
      return new ExtractionResult(true);
    }

    const formatTokens = new FormatStringTokenizer().Tokenize(format);
    if (!formatTokens) {
      return new ExtractionResult(str === '');
    }

    const result = new ExtractionResult(true);

    for (let i = 0; i < formatTokens.length; i++) {
      const currentToken = formatTokens[i];
      const previousToken = i > 0 ? formatTokens[i - 1] : null;

      if (currentToken.Type === FormatStringTokenType.ConstantText) {
        if (i === 0) {
          if (str.indexOf(currentToken.Text) !== 0) {
            result.IsMatch = false;
            return result;
          }

          str = str.substr(
            currentToken.Text.length,
            str.length - currentToken.Text.length,
          );
        } else {
          const matchIndex = str.indexOf(currentToken.Text);
          if (matchIndex < 0) {
            result.IsMatch = false;
            return result;
          }

          result.Matches.push({
            name: previousToken.Text,
            value: str.substr(0, matchIndex),
          });
          str = str.substring(
            0,
            matchIndex + currentToken.Text.length,
          );
        }
      }
    }

    const lastToken = formatTokens[formatTokens.length - 1];
    if (lastToken.Type === FormatStringTokenType.DynamicValue) {
      result.Matches.push({ name: lastToken.Text, value: str });
    }

    return result;
  }

  IsMatch(str: string, format: string): string[] {
    const result = new FormattedStringValueExtracter().Extract(str, format);
    if (!result.IsMatch) {
      return [];
    }
    const values = [...result.Matches];
    return values;
  }
}

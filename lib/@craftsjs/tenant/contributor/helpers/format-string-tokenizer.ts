import { FormatStringToken } from './format-string-token.helper';
import { FormatStringTokenType } from './format-string-token-type';

export class FormatStringTokenizer {
  Tokenize(
    format: string,
    includeBracketsForDynamicValues: boolean = false,
  ): FormatStringToken[] {
    const tokens: FormatStringToken[] = [];

    let currentText = '';
    let inDynamicValue = false;

    for (let i = 0; i < format.length; i++) {
      const c = format[i];
      switch (c) {
        case '{':
          if (inDynamicValue) {
            throw new Error(
              'Incorrect syntax at char ' +
              i +
              '! format string can not contain nested dynamic value expression!',
            );
          }

          inDynamicValue = true;

          if (currentText.length > 0) {
            tokens.push(
              new FormatStringToken(
                currentText,
                FormatStringTokenType.ConstantText,
              ),
            );
            currentText = '';
          }

          break;
        case '}':
          if (!inDynamicValue) {
            throw new Error(
              'Incorrect syntax at char ' +
              i +
              '! These is no opening brackets for the closing bracket }.',
            );
          }

          inDynamicValue = false;

          if (currentText.length <= 0) {
            throw new Error(
              'Incorrect syntax at char ' +
              i +
              '! Brackets does not containt any chars.',
            );
          }

          let dynamicValue = currentText;
          if (includeBracketsForDynamicValues) {
            dynamicValue = '{' + dynamicValue + '}';
          }

          tokens.push(
            new FormatStringToken(
              dynamicValue,
              FormatStringTokenType.DynamicValue,
            ),
          );
          currentText = '';

          break;
        default:
          currentText += c;
          break;
      }
    }

    if (inDynamicValue) {
      throw new Error('There is no closing } char for an opened { char.');
    }

    if (currentText.length > 0) {
      tokens.push(
        new FormatStringToken(
          currentText,
          FormatStringTokenType.ConstantText,
        ),
      );
    }

    return tokens;
  }
}

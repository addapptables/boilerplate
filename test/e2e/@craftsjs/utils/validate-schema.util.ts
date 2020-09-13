import { transformAndValidate } from 'class-transformer-validator';
import * as R from 'ramda';

const options = {
  validator: { skipMissingProperties: true }, transformer: { excludeExtraneousValues: true }
};

type Class<T> = { new(...args: any[]): T; };

export const validateSchema = <T extends object>(classSchema: Class<T>, data: T) =>
  transformAndValidate(classSchema, JSON.stringify(data), options);

export const validateSchemaCurry = R.curry(<T extends object>(classSchema: Class<T>, data: T) =>
  transformAndValidate(classSchema, JSON.stringify(data), options));

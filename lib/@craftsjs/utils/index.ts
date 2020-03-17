export * from './mapper.util';

import * as R from 'ramda';
export const mergeAndRemoveEmpty = (object) => R.compose(R.reject(R.isNil), R.merge(object));
export const removeEmpty = (object) => R.reject(R.isNil, object);
export const isEmpty = (object) => R.isNil(object) || R.isEmpty(object);

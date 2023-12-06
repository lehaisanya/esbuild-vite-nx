import { Errors } from './errors';

export type Response<TInput extends {}, TResult> =
  | {
      success: true;
      result: TResult;
    }
  | {
      success: false;
      errors: Errors<TInput>;
    };

export type SortingDirection = 'ASC' | 'DESC';

export interface Sorting<TFields extends string> {
  column: TFields;
  direction: SortingDirection;
}

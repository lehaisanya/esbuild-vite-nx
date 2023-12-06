export interface FieldIsEmpty {
  key: 'FIELD_IS_EMPTY';
}

export interface FieldIsTooLong {
  key: 'FIELD_IS_TOO_LONG';
  maxLength: number;
}

export interface FieldIsOutOfRange {
  key: 'FIELD_IS_OUT_OF_RANGE';
  from: number;
  to: number;
}

export type ValidationError = FieldIsEmpty | FieldIsOutOfRange | FieldIsTooLong;

export type Errors<TRecord extends {}> = {
  [TField in keyof TRecord]?: ValidationError;
};

export class ErrorsBuilder<TRecord extends {}> {
  private errors: Errors<TRecord> = {};
  private errorCount: number = 0;

  add(field: keyof TRecord, error: ValidationError): void {
    this.errors[field] = error;
    this.errorCount++;
  }

  build(): Errors<TRecord> | null {
    return this.errorCount > 0 ? this.errors : null;
  }
}

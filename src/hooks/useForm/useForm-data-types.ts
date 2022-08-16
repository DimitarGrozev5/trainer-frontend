type ValidatorFn = (form: Form, target: string) => boolean;

export class InputInit {
  name: string;
  init: string;
  err: string;
  validator: ValidatorFn;

  constructor(name: string, init: string, err: string, validator: ValidatorFn) {
    this.name = name;
    this.init = init;
    this.err = err;
    this.validator = validator;
  }
}

export class Input {
  value: string;
  err: string;
  validator: ValidatorFn;
  isValid: string = "";
  touched: boolean = false;

  constructor(init: string, err: string, validator: ValidatorFn) {
    this.value = init;
    this.err = err;
    this.validator = validator;
  }
}

export type Form = { [name: string]: Input };

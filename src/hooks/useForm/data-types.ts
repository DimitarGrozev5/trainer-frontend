export class InputInit {
  name: string;
  init: string;
  err: string;
  validator: (val: string) => boolean;

  constructor(
    name: string,
    init: string,
    err: string,
    validator: (val: string) => boolean
  ) {
    this.name = name;
    this.init = init;
    this.err = err;
    this.validator = validator;
  }
}

export class Input {
  value: string;
  err: string;
  validator: (val: string) => boolean;
  isValid: string = "";
  touched: boolean = false;

  constructor(init: string, err: string, validator: (val: string) => boolean) {
    this.value = init;
    this.err = err;
    this.validator = validator;
  }
}

export type Form = { [name: string]: Input };

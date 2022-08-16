import { useCallback, useMemo, useState } from "react";

class InputInit {
  name: string;
  init: string;
  err: string;
  validator: () => boolean;

  constructor(
    name: string,
    init: string,
    err: string,
    validator: () => boolean
  ) {
    this.name = name;
    this.init = init;
    this.err = err;
    this.validator = validator;
  }
}

class Input {
  value: string;
  err: string;
  validator: () => boolean;
  touched: boolean = false;

  constructor(init: string, err: string, validator: () => boolean) {
    this.value = init;
    this.err = err;
    this.validator = validator;
  }
}

// class Form {
//   inputs: Input[];

//   constructor(inputs: Input[]) {
//     this.inputs = inputs;
//   }
// }

export const useForm = (inputs: InputInit[]) => {
  // Transform Init data to a dictionery of inputs
  const initFormData: { [name: string]: Input } = useMemo(() => {
    return inputs.reduce(
      (obj, i) => ({ ...obj, [i.name]: new Input(i.init, i.err, i.validator) }),
      {}
    );
  }, [inputs]);

  const [formData, setFormData] = useState(initFormData);

  const onChange = useCallback(
    (target: string) => (value: string) => {
      setFormData((data) => ({
        ...data,
        [target]: { ...data[target], value },
      }));
    },
    []
  );

  return [formData, onChange] as const;
};

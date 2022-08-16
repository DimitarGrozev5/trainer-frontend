import { useMemo, useState } from "react";
import { produce } from "immer";

class InputInit {
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

class Input {
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

type Form = { [name: string]: Input };

export const useForm = (inputs: InputInit[]) => {
  // Transform Init data to a dictionery of inputs
  const initFormData: Form = useMemo(() => {
    return inputs.reduce(
      (obj, i) => ({ ...obj, [i.name]: new Input(i.init, i.err, i.validator) }),
      {}
    );
  }, [inputs]);

  const [formData, setFormData] = useState(initFormData);
  const [formWasTouched, setFormWasTouched] = useState(false);

  const onChange = (target: string) => (value: string) => {
    // Update State
    setFormData((data) => {
      const t = { ...data[target] };
      t.value = value;

      // Run validator
      const isValid = t.validator(value);

      // If the form and input are not touched, don't display error message
      t.isValid = "";
      if ((formWasTouched || t.touched) && !isValid) {
        t.isValid = t.err;
      }

      return { ...data, [target]: t };
    });
  };

  const onBlur = (target: string) => (value: string) => {
    setFormData((data) =>
      produce<Form>(data, (draft) => {
        draft[target].touched = true;
      })
    );
    onChange(target)(value);
  };

  const touchForm = () => {
    setFormWasTouched(true);
    setFormData((data) =>
      Object.keys(data)
        .map((target) => {
          const t = { ...data[target] };

          // Run validator
          const isValid = t.validator(t.value);

          // If the form and input are not touched, don't display error message
          t.isValid = "";
          if (!isValid) {
            t.isValid = t.err;
          }

          return [target, t] as const;
        })
        .reduce((a, c) => ({ ...a, [c[0]]: c[1] }), {})
    );
  };

  const resetForm = () => {
    setFormData(initFormData);
  };

  return [formData, onChange, onBlur, touchForm, resetForm] as const;
};

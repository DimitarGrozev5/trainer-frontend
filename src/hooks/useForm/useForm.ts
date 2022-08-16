import { useMemo, useState } from "react";
import { produce } from "immer";
import { InputInit, Input, Form } from "./data-types";

export const useForm = (inputs: InputInit[]) => {
  // Transform Init data to a dictionery of inputs
  const initFormData: Form = useMemo(() => {
    return inputs.reduce(
      (obj, i) => ({ ...obj, [i.name]: new Input(i.init, i.err, i.validator) }),
      {}
    );
  }, [inputs]);

  // Setup Form Data and helper state
  const [formData, setFormData] = useState(initFormData);
  const [formWasTouched, setFormWasTouched] = useState(false);

  // Create Change Handler
  // onChange the input field is changed and validated
  // An error is set to isValid, only if the Input field or Form was previously touched
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

  // Create Blur Handler
  // Set the filed to touched and run onChange, to validate the field
  const onBlur = (target: string) => (value: string) => {
    setFormData((data) =>
      produce<Form>(data, (draft) => {
        draft[target].touched = true;
      })
    );
    onChange(target)(value);
  };

  // Function that sets the form to touched and validated all fields
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

  // Function that resets the form to the initFormData state
  const resetForm = () => {
    setFormData(initFormData);
  };

  return [formData, onChange, onBlur, touchForm, resetForm] as const;
};

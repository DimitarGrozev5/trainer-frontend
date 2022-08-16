import { useMemo, useState } from "react";
import { produce, current } from "immer";
import { InputInit, Input, Form } from "./useForm-data-types";

export const useForm = (inputs: InputInit[]) => {
  // Transform Init data to a dictionery of inputs
  const initFormData: Form = useMemo(() => {
    return inputs.reduce(
      (obj, i) => ({ ...obj, [i.name]: new Input(i.init, i.err, i.validator) }),
      {}
    );
  }, [inputs]);

  // Setup Form Data and helper state
  const [formData, setFormData] = useState<Form>(initFormData);
  const [formWasTouched, setFormWasTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // Create Change Handler
  // onChange the input field is changed and validated
  // An error is set to isValid, only if the Input field or Form was previously touched
  const onChange = (target: string) => (value: string) => {
    setFormData((data) => {
      const t = { ...data[target] };
      let newData = { ...data, [target]: t };

      // Update Value
      t.value = value;

      // Validate field
      if (formWasTouched || t.touched) {
        const isValid = t.validator(newData, target);
        t.isValid = "";
        if (!isValid) {
          t.isValid = t.err;
        }
      }
      newData = { ...data, [target]: t };

      // Validate form
      setFormIsValid(
        Object.entries(newData).reduce(
          (a, c) => a && c[1].validator(newData, c[0]),
          true
        )
      );

      // Return state
      return newData;
    });
  };

  // Create Blur Handler
  // Set the filed to touched, validate all fields, to set the form validity and run onChange
  const onBlur = (target: string) => (value: string) => {
    setFormData((data) =>
      produce<Form>(data, (draft) => {
        draft[target].touched = true;
      })
    );
    onChange(target)(value);
  };

  // Function that sets the form to touched, validated all fields and returns if the form is valid
  const touchForm = () => {
    setFormWasTouched(true);
    setFormData((data) => {
      let allIsValid = true;
      const allData = Object.keys(data).map((target) => {
        const t = { ...data[target] };

        // Run validator
        const isValid = t.validator(data, target);
        allIsValid = allIsValid && isValid;

        // If the form and input are not touched, don't display error message
        t.isValid = "";
        if (!isValid) {
          t.isValid = t.err;
        }

        return [target, t] as const;
      });

      setFormIsValid(allIsValid);

      return allData.reduce((a, c) => ({ ...a, [c[0]]: c[1] }), {});
    });
  };

  // Function that resets the form to the initFormData state
  const resetForm = () => {
    setFormData(initFormData);
  };

  return [
    formData,
    formIsValid,
    onChange,
    onBlur,
    touchForm,
    resetForm,
  ] as const;
};

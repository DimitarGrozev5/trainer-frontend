import { Form } from "./useForm-data-types";

export const V = {
  notEmpty: () => (formData: Form, target: string) =>
    formData[target].value.length > 0,

  isEmail: () => (formData: Form, target: string) =>
    /\S+@\S+\.\S+/.test(formData[target].value),

  longerThan: (min: number) => (formData: Form, target: string) =>
    formData[target].value.length > min,

  isEqualTo: (targetCompare: string) => (formData: Form, target: string) =>
    formData[targetCompare].value === formData[target].value &&
    formData[target].value.length > 0,
};

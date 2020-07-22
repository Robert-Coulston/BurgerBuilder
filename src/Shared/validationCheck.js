export const checkValidity = (value, rules) => {
    let response = {
      isValid: true,
      errorMessage: "",
    };

    if (rules.required && response.isValid) {
      response.isValid = value.trim() !== "";
      if (!response.isValid) {
        response.errorMessage = "This is a required field";
      }
    }

    if (rules.doesNotIncludeNumbers && response.isValid) {
      response.isValid = !hasNumber(value);
      if (!response.isValid) {
        response.errorMessage = "This field must not contain numbers";
      }
    }

    if (rules.minLength && response.isValid) {
      response.isValid = value.length >= rules.minLength;
      if (!response.isValid) {
        response.errorMessage = `This field has a minimum length of ${rules.minLength}`;
      }
    }

    if (rules.maxLength && response.isValid) {
      response.isValid = value.length <= rules.maxLength;
      if (!response.isValid) {
        response.errorMessage = `This field has a maximum length of ${rules.maxLength}`;
      }
    }
    return response;
  };

  
  const hasNumber = (stringHasNumber) => {
    return /\d/.test(stringHasNumber);
  };

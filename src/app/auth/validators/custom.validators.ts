import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/*Validador personalizado para el numero de telefono */
export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const numericOnly = /^\d+$/.test(value);
        const minLength = value.length >= 8;

        if(!numericOnly) return { nonNumeric: true};
        if(!minLength) return { minLengthError: {requiredLength: 8, actualLength: value.length }};

        return null;
    };
}

/*Validado personalizado para la contrasenia */
export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>{
        const value = control.value;
        if (!value) return null;

        const minLength = value.length >=6;
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumeric = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (minLength && hasLowercase && hasUppercase && hasNumeric && hasSpecial) return null;

        return {
            invalidPassword: {
                minLength,
                lowercase: hasLowercase,
                uppercase: hasUppercase,
                numeric : hasNumeric,
                special: hasSpecial
            }
        };
    };
}

/*Validador personalizado para token OPT. */
export function otpValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const numericOnly = /^\d+$/.test(value);
        const minLength = value.length >=6;

        if(!numericOnly) return {nonNumeric: true};
        if (!minLength) return {minLengthError: {requiredLength: 6, actualLength: value.length}}

        return null;
    }
}
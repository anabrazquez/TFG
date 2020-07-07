import { ValidatorFn, AbstractControl } from '@angular/forms';

//Comprobamos que sea número entero o decimal
export function numberValido(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        let errorValidacion = false;
        if (control) {
            const configuracionFormGroup = control.parent;
            if (configuracionFormGroup) {
                const voltajeValue = control.value;
                let number = /^[.\d]+$/.test(voltajeValue) ? +voltajeValue : NaN;
                if (number !== number) {
                    return { 'value': true };
                  }
                  return null;
                };
    }
}
}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})

export class ConfiguracionComponent implements OnInit {

    public envioFormulario: FormGroup;
    public enviado: Boolean = false;
    public closeAlert: Boolean = true;
    public closeAlertError: Boolean = true;
    public errorEnvio: String;
    formSuscription;
    public canales: any[] = [{
        'id': 1,
        'name': 'Channel 1'
    },
    {
        'id': 2,
        'name': 'Channel 2'
    },
    {
        'id': 3,
        'name': 'Channel 3'
    },
    {
        'id': 4,
        'name': 'Channel 4'
    }];

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.errorEnvio = '';
        this.buildFormularioContacto();
        // this.setValueFormValidators();
    }

    // setValueFormValidators() {

    //     const correoControl = this.envioFormulario.get('direccionemail');
    //     const condicionesControl = this.envioFormulario.get('condiciones');

    //     this.envioFormulario.get('asunto').valueChanges.subscribe(() => {
    //         correoControl.updateValueAndValidity();
    //     });

    //     this.envioFormulario.get('direccionemail').valueChanges.subscribe(() => {
    //         condicionesControl.updateValueAndValidity();
    //     });

    // }

    buildFormularioContacto() {
        this.envioFormulario = this.formBuilder.group({
            canal: ['' , Validators.required],
            tiempo: ['', Validators.required],
            voltaje: ['', Validators.required],
            muestreo: ['', Validators.required]
        });
    }

    get f() { return this.envioFormulario.controls; }

            // this.envioFormulario.reset({ direccionemail: null, asunto: this.tipoSugerencia, mensaje: null });

    formularioValido() {
        return this.envioFormulario.valid;
    }
}


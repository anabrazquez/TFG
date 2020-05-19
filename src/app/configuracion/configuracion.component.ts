import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})

export class ConfiguracionComponent implements OnInit {

    @Input() tipoSugerencia: String;
    public tituloPagina = 'Contacto';
    public urlImagen = 'content/images/iconos/contacto/contacto.svg';
    public envioFormulario: FormGroup;
    public enviado: Boolean = false;
    public closeAlert: Boolean = true;
    public closeAlertError: Boolean = true;
    public errorEnvio: String;
    formSuscription;
    public tiposAsunto: any[] = [
        {
            clave: 'INCIDENCIA',
            valor: 'Incidencias'
        },
        {
            clave: 'SUGERENCIA_CITA',
            valor: 'Sugerencia de Citas'
        },
        {
            clave: 'SUGERENCIA_DATO',
            valor: 'Sugerencia de Datos'
        },
        {
            clave: 'SUGERENCIA_TARJETA',
            valor: 'Sugerencia de Tarjetas'
        },
        {
            clave: 'SUGERENCIA_GENERAL',
            valor: 'Otras sugerencias'
        }
    ]

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.errorEnvio = '';
        this.buildFormularioContacto();
        this.setValueFormValidators();
    }

    setValueFormValidators() {

        const correoControl = this.envioFormulario.get('direccionemail');
        const condicionesControl = this.envioFormulario.get('condiciones');

        this.envioFormulario.get('asunto').valueChanges.subscribe(() => {
            correoControl.updateValueAndValidity();
        });

        this.envioFormulario.get('direccionemail').valueChanges.subscribe(() => {
            condicionesControl.updateValueAndValidity();
        });

    }

    buildFormularioContacto() {
        this.envioFormulario = this.formBuilder.group({
            direccionemail: ['' , Validators.required],
            asunto: [this.tipoSugerencia, Validators.required],
            mensaje: ['', Validators.required],
            condiciones: ['', Validators.required]
        });
    }

    get f() { return this.envioFormulario.controls; }

            // this.envioFormulario.reset({ direccionemail: null, asunto: this.tipoSugerencia, mensaje: null });

    formularioValido() {
        return this.envioFormulario.valid;
    }
}


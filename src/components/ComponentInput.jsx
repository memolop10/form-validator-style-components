import React from 'react'
import { GroupInput, IconoValidation, LeyendaError, Label,Input} from '../elements/Formularios' 
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


const ComponentInput = ({estado, cambiarEstado, placeholder, label, name, tipo, leyendaError, expresionRegular }) => {
    
    const onChange = (e) => {
        cambiarEstado({
            ...estado,
            campo: e.target.value
        })
    }

    const validacion = () => {
        if (expresionRegular) {
            if (expresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido:'true' })
            } else {
                cambiarEstado({ ...estado, valido:'false' })
            }
        }
    }
    
    return (
        <div>
            <Label htmlFor={name} valido={ estado.valido }>{label}</Label>
            <GroupInput>
            <Input 
                type={tipo} 
                placeholder={placeholder} 
                id={name}
                value={ estado.campo }
                onChange={ onChange }
                onKeyUp={ validacion }
                onBlur={ validacion }
                valido={ estado.valido }
            />

            <IconoValidation  
                icon={ estado.valido === 'true' ? faCheckCircle : faTimesCircle } 
                valido={ estado.valido }
            />
            </GroupInput>
            <LeyendaError valido={ estado.valido }>{leyendaError}</LeyendaError>
        </div>
    )
}

export default ComponentInput

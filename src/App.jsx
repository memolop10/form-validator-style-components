import { useState } from 'react';
import { Formulario, Label, ContenedorBotonCentrado, ContenedorTerminos, Boton, MensajeExito, MensajeError } from './elements/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import ComponentInput from './components/ComponentInput'

function App() {

    const [usuario, setUsuario] = useState({campo:'', valido: null});
    const [nombre, setNombre ] = useState({campo:'', valido: null});
    const [password, setPassword ] = useState({campo:'', valido: null});
    const [password2, setPassword2 ] = useState({campo:'', valido: null});
    const [correo, setCorreo ] = useState({campo:'', valido: null});
    const [telefono, setTelefono ] = useState({campo:'', valido: null});
    const [terminos, setTerminos] = useState(false);
    const [formValido, setFormValido] = useState(null);

    const expresiones = {
      usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
      nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
      password: /^.{4,12}$/, // 4 a 12 digitos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    const validarPassword2 = () => {
      if (password.campo.length > 0) {
        if (password.campo !== password2.campo) {
          setPassword2((prevState) => {
            return {
              ...prevState, valido: 'false'
            }
          })
        }else{
          setPassword2((prevState) => {
            return {
              ...prevState, valido: 'true'
            }
          })
        }
      }
    }

    const onChangeTerminos = (e) => {
      setTerminos(
        e.target.checked
      )
    }

    const onSubmit = (e) => {
      e.preventDefault(); 
      
      if (usuario.valido === 'true' &&
          nombre.valido === 'true' &&
          password.valido === 'true' &&
          password2.valido === 'true' &&
          correo.valido === 'true' &&
          telefono.valido === 'true' &&
          terminos
      ) {
          setFormValido(true)
          setUsuario({campo:'', valido: null});
          setNombre({campo:'', valido: null});
          setPassword({campo:'', valido: null});
          setPassword2({campo:'', valido: null});
          setCorreo({campo:'', valido: null});
          setTelefono({campo:'', valido: null});
          setTerminos(null)
      }else{
        setFormValido(false)
      }
    }

  return (
   <main>
     <Formulario onSubmit={onSubmit}>

      <ComponentInput 
        estado={ usuario } 
        cambiarEstado={ setUsuario } 
        label="Usuario"
        placeholder="Usuario"
        tipo="text"
        name="usuario"
        leyendaError="El usuario tiene que tener una longitus de 10 o mas caracteres"
        expresionRegular={ expresiones.usuario }
      />

      <ComponentInput 
        estado={ nombre } 
        cambiarEstado={ setNombre } 
        label="Nombre"
        placeholder="MEMO"
        tipo="text"
        name="usuario"
        leyendaError="solo puede contener letras y espacios"
        expresionRegular={ expresiones.nombre }
      />

      <ComponentInput 
        estado={ password } 
        cambiarEstado={ setPassword } 
        label="Contraseña"
        tipo="password"
        name="password1"
        leyendaError="Tiene que ser de 4 a 12 digitos"
        expresionRegular={ expresiones.password }
      />

      <ComponentInput 
        estado={ password2 } 
        cambiarEstado={ setPassword2 } 
        label="Repetir Contraseña"
        tipo="password"
        name="password1"
        leyendaError="Ambas contraseñas deben ser iguales"
        funcion={ validarPassword2 }
      />

      <ComponentInput 
        estado={ correo } 
        cambiarEstado={ setCorreo } 
        label="Email"
        placeholder="he@gmail.com"
        tipo="email"
        name="correo"
        leyendaError="correo invalido"
        expresionRegular={ expresiones.correo }
      />

      <ComponentInput 
        estado={ telefono } 
        cambiarEstado={ setTelefono } 
        label="Telefono"
        placeholder="5648123697"
        tipo="text"
        name="telefono"
        leyendaError="Telefono invalido"
        expresionRegular={ expresiones.telefono }
      />

       <ContenedorTerminos>
         <Label>
           <input 
              type="checkbox" 
              name="terminos" 
              id="terminos" 
              checked={terminos} 
              onChange={ onChangeTerminos }
            />
           Acepto los Terminos y Condiciones
         </Label>
       </ContenedorTerminos>
       { 
          formValido === false && <MensajeError>
            <p>
                <FontAwesomeIcon icon={ faExclamationTriangle }/>
              <b>Error:</b>Por favor llena bien el formulario</p>
          </MensajeError>
       }
       <ContenedorBotonCentrado>
         <Boton type="submit">Enviar</Boton>
         {
            formValido === true && <MensajeExito>Formulario se envio</MensajeExito>
         }
       </ContenedorBotonCentrado>
     </Formulario>
   </main>
  );
}



export default App;

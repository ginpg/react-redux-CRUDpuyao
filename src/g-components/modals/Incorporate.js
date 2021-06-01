import React, {Fragment} from 'react'
import {Form} from 'react-bootstrap';

function Disincorporate({nombre}) {

   return(
       <Fragment>
                <p>¿Seguro que quiere incorporar a {nombre}?</p>          
        </Fragment>
    
   )
}

export default Disincorporate;

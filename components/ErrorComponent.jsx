import React from 'react'
import {ErrorMessage} from 'formik'

function ErrorComponent({name}) {
    return (
        <div>
            <div style={{color:"red", position:"absolute",marginLeft:"110px",marginTop:"-1px"}}>
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

export default ErrorComponent

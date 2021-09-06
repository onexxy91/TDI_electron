import React, {useRef, useState} from 'react'

export default function JobAType( props ) {
    console.log(props)
    const style = {
        display: "flex",
        flexDirection : "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        height: "75vh",
       
    }
    return (<section style={style}>
            <div style={{ display: "flex",
        flexDirection : "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "72vh",
        backgroundImage:"url(./AType.png)", 
        backgroundSize: "100%", 
        }}>
           
        </div>
          
    </section>
    )
}


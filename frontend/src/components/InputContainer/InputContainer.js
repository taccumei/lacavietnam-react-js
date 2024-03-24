import classes from './inputcontainer.module.css'
import React from 'react'

export default function InputContainer({label, bgColor, children}) {
  return (
    <div>
      <div className={classes.container} style={{ backgroundColor: bgColor }}>
        <label className={classes.label}>{label}</label>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}
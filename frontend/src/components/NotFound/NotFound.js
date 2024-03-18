import React from 'react'
import { Link } from 'react-router-dom';
import classes from './notfound.module.css';

export default function NotFound({messages, linkRoute, linkText}) {
  return (
    <div className={classes.container}>
      {messages}
      <Link to={linkRoute}>{ linkText}</Link>
    </div>
  )
};

NotFound.defaultProps = {
  messages: 'Nothing Found',
  linkRoute: '/',
  linkText: 'Go To Home Page'
}

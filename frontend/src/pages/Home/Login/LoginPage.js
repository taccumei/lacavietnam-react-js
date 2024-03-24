import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import classes from './loginpage.module.css';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

export default function LoginPage() {

   const {
    handleSubmit, //calling submit function when there is no validation error
    register, //sending events and references that is necessary for handling validation
    formState: { errors },
  } = useForm();

   const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();//giving us all the query params
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) console.log({user}); return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);
  //there's no user->stay in the login page
  
  const submit = async({email, password}) => {
    login(email, password);
  }

   return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
            required: true,
            })}
            error={errors.password}
          />
          <Button type="submit" text="Login" />
        </form>
      </div>

    </div>
  )
}

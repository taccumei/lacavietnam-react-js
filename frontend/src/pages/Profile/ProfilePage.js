import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import classes from './profilepage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

export default function ProfilePage() {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile } = useAuth();
  const submit = user => {
    //update profile
    updateProfile(user);
   }
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(submit)}>
          <Input 
            defaultValue={user.name}
            type="text"
            label="name"
            {...register('name', {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />
          <Input 
            defaultValue={user.address}
            type="text"
            label="address"
            {...register('address', {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Update" backgroundColor="#009e84"/>
        </form>
        <ChangePassword/>
      </div>
    </div>
  )
}

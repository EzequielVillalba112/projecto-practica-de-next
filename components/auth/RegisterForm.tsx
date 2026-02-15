"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { ValidFormRegister } from "@/validation/ValidForm";
import axios from "axios";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = ValidFormRegister(form.name, form.email, form.password);

    if (res.error) {
      setError({ ...error, error: res.error, message: res.message });

      setTimeout(() => {
        setError({ ...error, error: false, message: "" });
      }, 3000);
    }

    const registerRes = await axios.post("/api/auth/register", form);
    console.log(registerRes);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Flex direction="column" gap="2">
        <label htmlFor="email">Nombre de usuario</label>

        <TextField.Root
          id="name-user"
          type="text"
          placeholder="Juan Perez"
          autoFocus
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        >
          <TextField.Slot>
            <PersonIcon width="16" height="16" />
          </TextField.Slot>
        </TextField.Root>

        <label htmlFor="email">Correo</label>

        <TextField.Root
          id="email"
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        >
          <TextField.Slot>
            <EnvelopeClosedIcon width="16" height="16" />
          </TextField.Slot>
        </TextField.Root>

        <label htmlFor="password">Contraseña</label>

        <TextField.Root
          id="password"
          type="password"
          placeholder="******"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        >
          <TextField.Slot>
            <LockClosedIcon width="16" height="16" />
          </TextField.Slot>
        </TextField.Root>

        {error.error && (
          <div className="w-full bg-red-950 p-2 text-center rounded-sm">
            <p className="text-red-500 text-base ">{error.message}</p>
          </div>
        )}

        <Button type="submit" mt="4">
          Registrarme
        </Button>
      </Flex>
    </form>
  );
};

export default RegisterForm;

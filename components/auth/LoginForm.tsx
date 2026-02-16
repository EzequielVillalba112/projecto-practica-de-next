"use client";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ValidFormLogin } from "@/validation/ValidForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const router = useRouter();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    //validacion
    const res = ValidFormLogin(form.email, form.password);

    if (res.error) {
      setError({ error: true, message: res.message });

      setTimeout(() => {
        setError({ error: false, message: "" });
      }, 3000);

      return;
    }

    //Consulta a bd
    const loginRes = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!loginRes?.ok) {
      setError({
        error: true,
        message: `${loginRes?.error}`,
      });
      setTimeout(() => {
        setError({ error: false, message: "" });
      }, 3000);

      return;
    }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Flex direction="column" gap="2">
        <label htmlFor="email">Correo</label>

        <TextField.Root
          id="email"
          type="email"
          placeholder="example@gmail.com"
          autoFocus
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
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
          required
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
        <Button type="submit" mt="4" className="!cursor-pointer">
          Entrar
        </Button>
      </Flex>
    </form>
  );
};

export default LoginForm;

"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

const RegisterForm = () => {
  return (
    <Flex direction="column" gap="2">
      <label htmlFor="email">Nombre de usuario</label>

      <TextField.Root
        id="name-user"
        type="text"
        placeholder="Juan Perez"
        autoFocus
      >
        <TextField.Slot>
          <PersonIcon width="16" height="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="email">Correo</label>

      <TextField.Root id="email" type="email" placeholder="example@gmail.com">
        <TextField.Slot>
          <EnvelopeClosedIcon width="16" height="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="password">Contraseña</label>

      <TextField.Root id="password" type="password" placeholder="******">
        <TextField.Slot>
          <LockClosedIcon width="16" height="16" />
        </TextField.Slot>
      </TextField.Root>

      <Button>Registrarme</Button>
    </Flex>
  );
};

export default RegisterForm;

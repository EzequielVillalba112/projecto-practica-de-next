'use client';

import { Button, Flex, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

const LoginForm = () => {
  return (
    <Flex direction="column" gap="2">
      <label htmlFor="email">Correo</label>

      <TextField.Root
        id="email"
        type="email"
        placeholder="example@gmail.com"
        autoFocus
      >
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

      <Button>Entrar</Button>
    </Flex>
  );
};

export default LoginForm;

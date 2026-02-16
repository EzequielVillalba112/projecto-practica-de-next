"use client";
import {
  Flex,
  TextField,
  Box,
  TextArea,
  Button,
  Container,
  Heading,
  Card,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

const NewTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [message, setMessage] = useState({
    status: false,
    message: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError({ error: true, message: "Todos los campos son obligatorios" });

      setTimeout(() => {
        setError({ error: false, message: "" });
      }, 3000);

      return;
    }

    const res = await axios.post("/api/project", form);

    if (res.status === 201) {
      setForm({ title: "", description: "" });
      setMessage({ status: true, message: "Tarea creada con exito" });

      setTimeout(() => {
        setMessage({ status: false, message: "" });
      }, 3000);

      return;
    } else {
      setError({ error: true, message: res.data.message });
    }
  };

  return (
    <Container size="1" className="p-3 md:p-0">
      <Flex className="h-screen w-full items-center justify-center">
        <Card className="w-full max-w-md !p-7">
          <Heading className="text-center pb-3">Crear nueva tarea</Heading>
          <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">
            <Box>
              <label>Titulo de la tarea</label>
              <TextField.Root
                value={form.title}
                variant="surface"
                placeholder="Titulo de la tarea"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Box>
            <Box>
              <label>Descripcion de la tarea</label>
              <TextArea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Descripcion de la tarea"
              />
            </Box>
            {error.error && (
              <div className="w-full bg-red-950 p-2 text-center rounded-sm">
                <p className="text-red-500 text-base ">{error.message}</p>
              </div>
            )}
            {message.status && (
              <div className="w-full bg-green-950 p-2 text-center rounded-sm">
                <p className="text-green-500 text-base ">{message.message}</p>
              </div>
            )}
            <Button type="submit" className="!cursor-pointer">
              Crear tarea
            </Button>
          </form>
        </Card>
      </Flex>
    </Container>
  );
};

export default NewTask;

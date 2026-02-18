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
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const NewTask = () => {
  const router = useRouter();
  const params = useParams();
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

  useEffect(() => {
    const getData = async () => {
      try {
        if (params.projectId) {
          const res = await axios.get(`/api/project/${params.projectId}`);

          if (res.status === 200) {
            setForm({
              title: res.data.title,
              description: res.data.description,
            });
          } else {
            toast.error(res.data.message);
            router.push("/dashboard");
          }
        }
      } catch (error) {
        if (error) {
          toast.error("Error al obtener el proyecto" + error);
          router.push("/dashboard");
        }
      }
    };

    getData();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError({ error: true, message: "Todos los campos son obligatorios" });

      setTimeout(() => {
        setError({ error: false, message: "" });
      }, 3000);

      return;
    }

    if (!params.projectId) {
      const res = await axios.post("/api/project", form);

      if (res.status === 201) {
        setForm({ title: "", description: "" });
        setMessage({ status: true, message: "Tarea creada con exito" });

        setTimeout(() => {
          setMessage({ status: false, message: "" });
        }, 2000);

        return;
      } else {
        setError({ error: true, message: res.data.message });
        setTimeout(() => {
          setError({ error: false, message: "" });
        }, 2000);

        return;
      }
    } else {
      try {
        const res = await axios.put(`/api/project/${params.projectId}`, form);

        if (res.status === 200) {
          toast.success("Proyecto actualizado con exito");
          router.push("/dashboard");
        }

      } catch (error) {
        if (error) {
          toast.error("Error al actualizar el proyecto");
          router.push("/dashboard");
        }
      }
    }
  };

  const handleDelete = async (idProject: string) => {
    try {
      const res = await axios.delete(`/api/project/${idProject}`);

      if (res.status === 200) {
        toast.success("Proyecto eliminado con exito");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error) {
        toast.error("Error al eliminar el proyecto");
        router.push("/dashboard");
      }
    }
  };

  return (
    <Container size="1" className="p-3 md:p-0">
      <Flex className="h-screen w-full items-center justify-center">
        <Card className="w-full max-w-md !p-7">
          <Heading className="text-center pb-3">
            {params.projectId ? "Editar proyecto" : "Crear proyecto"}
          </Heading>
          <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">
            <Box>
              <label>Titulo del proyecto</label>
              <TextField.Root
                value={form.title}
                variant="surface"
                placeholder="Titulo del proyecto"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Box>
            <Box>
              <label>Descripcion del proyecto</label>
              <TextArea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Descripcion del proyecto"
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
              {params.projectId ? "Editar proyecto" : "Crear proyecto"}
            </Button>
            {!params.projectId && (
              <Link
                href="/dashboard"
                className="!mt-2 text-blue-400 cursor-pointer"
              >
                Volver a dashboard {"->"}
              </Link>
            )}
          </form>
          {params.projectId && (
            <Button
              className="!cursor-pointer !w-full !mt-4"
              color="red"
              onClick={() => handleDelete(params.projectId as string)}
            >
              Eliminar proyecto
            </Button>
          )}
        </Card>
      </Flex>
    </Container>
  );
};

export default NewTask;

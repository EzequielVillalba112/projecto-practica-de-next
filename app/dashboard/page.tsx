"use client";
import { Button, Container, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="mt-4 flex items-center justify-between">
        <Heading>Tareas</Heading>
        <Button
          className="!cursor-pointer"
          onClick={() => router.push("/dashboard/tasks/new")}
        >
          Crear tarea
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;

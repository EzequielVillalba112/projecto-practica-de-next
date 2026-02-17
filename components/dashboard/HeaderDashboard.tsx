"use client";
import { Button, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
const HeaderDashboard = () => {
  const router = useRouter();
  return (
    <div className="mt-4 flex items-center justify-between p-4">
      <Heading>Proyecto</Heading>
      <Button
        className="!cursor-pointer"
        onClick={() => router.push("/dashboard/project/new")}
      >
        Crear proyecto
      </Button>
    </div>
  );
};

export default HeaderDashboard;

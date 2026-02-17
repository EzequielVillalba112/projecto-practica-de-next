"use client";
import { Project } from "@/generated/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  return (
    <Card
      key={project.id}
      className="p-4 hover:cursor-pointer hover:opacity-75"
      onClick={() => router.push(`/dashboard/project/${project.id}`)}
    >
      <Heading>{project.title}</Heading>
      <Text className="text-gray-400">{project.description}</Text>
    </Card>
  );
};

export default ProjectCard;

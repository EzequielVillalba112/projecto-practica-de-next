import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import { prisma } from "@/lib/prisma";
import { Container, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectCard from "@/components/project/ProjectCard";

async function loadProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      user: {
        id: parseInt(userId),
      },
    },
  });

  return projects;
}

const Dashboard = async () => {
  const sesion = await getServerSession(authOptions);
  if (!sesion) {
    return null;
  }
  const projects = await loadProjects(sesion.user.id);
  console.log(projects);
  

  return (
    <Container>
      <HeaderDashboard />
      <Grid columns="3" gap="4" className=" p-4">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;

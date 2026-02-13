import { Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

const Login = () => {
  return (
    <Container size="1" className="p-3 md:p-0">
      <Flex className="h-screen w-full items-center justify-center">
        <Card className="w-full max-w-md !p-7">
          <Heading className="text-center pb-3">Iniciar sesión</Heading>
          <LoginForm />
          
          <Flex justify="between" my="4">
            <Text>No tinenes una cuenta?</Text>
            <Link className="text-blue-500" href="/auth/register">Registrate</Link>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
};

export default Login;

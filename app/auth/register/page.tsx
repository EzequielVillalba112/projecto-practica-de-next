import RegisterForm from "@/components/auth/RegisterForm";
import { Card, Container, Flex, Heading, Text } from "@radix-ui/themes";

import Link from "next/link";

const Register = () => {
  return (
    <>
      <Container size="1" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center justify-center">
          <Card className="w-full max-w-md !p-7">
            <Heading className="text-center pb-3">Registrarme</Heading>
            <RegisterForm />

            <Flex justify="between" my="4">
              <Text>Ya tienes una cuenta?</Text>
              <Link className="text-blue-500" href="/auth/login">
                Iniciar sesión
              </Link>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </>
  );
};

export default Register;

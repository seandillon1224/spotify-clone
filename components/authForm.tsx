import { Box, Flex, Input, Button } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { auth, Mode } from "../lib/mutations";

const AuthForm: FC<{ mode: Mode }> = ({ mode }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, { email, password });
    setIsLoading(false);
    router.push('/');
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/trax.svg" height={60} width={120}/>
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              bg="green.500"
              isLoading={isLoading}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

export interface GradientLayoutProps {
  color: string;
  children: React.ReactNode;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  roundImage?: boolean;
}

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage = false,
}: GradientLayoutProps) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex align="end" bg={`${color}.600`} padding="40px">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="xs" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="xs">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;

import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const ArtistCard = ({ name }) => {
  return (
    <Box padding="10px" width="20%">
      <Box bg="gray.800" borderRadius="4px" padding="15px" width="100%">
        <Image
          src="https://place-puppy.com/public-images/index-page/image8/210x280-lg.jpg"
          borderRadius="100%"
        />
        <Box marginTop="10px">
          <Text fontSize="large">{name}</Text>
          <Text fontSize="xs">Artist</Text>
        </Box>
      </Box>
    </Box>
  );
};

const Home = ({ artists }) => {
  const { user } = useMe();
  return (
    <GradientLayout
      subtitle="Profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      color="blue"
      roundImage
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
    >
      <Box paddingX="40px" color="white">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="sm">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <ArtistCard key={artist.name} {...artist} />
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;

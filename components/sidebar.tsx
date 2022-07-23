import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navMenu = [
  { name: "Home", icon: MdHome, route: "/" },
  { name: "Search", icon: MdSearch, route: "/search" },
  { name: "Library", icon: MdLibraryMusic, route: "/library" },
];

const musicMenu = [
  { name: "CreatePlaylist", icon: MdPlaylistAdd, route: "/" },
  { name: "Favorites", icon: MdFavorite, route: "/" },
];

const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/trax.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map(({ icon, name, route }) => (
              <ListItem key={name} paddingX="20px" fontSize="20px">
                <LinkBox>
                  <NextLink href={route} passHref>
                    <LinkOverlay>
                      <ListIcon as={icon} color="white" marginRight="20px" />
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginTop="20px" marginBottom="20px">
          <List spacing={2}>
            {musicMenu.map(({ icon, name, route }) => (
              <ListItem key={name} paddingX="20px" fontSize="20px">
                <LinkBox>
                  <NextLink href={route} passHref>
                    <LinkOverlay>
                      <ListIcon as={icon} color="white" marginRight="20px" />
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem paddingX="20px" key={playlist}>
                <LinkBox>
                  <NextLink href="/">
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

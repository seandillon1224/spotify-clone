import { GetServerSidePropsContext } from "next";
import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBGColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({
  query,
  req,
}: GetServerSidePropsContext) => {
  let user;
  try {
    user = validateToken(req.cookies[process.env.COOKIE_NAME]) as {
      id: number;
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const playlist = await prisma.playlist.findFirst({
    where: {
      id: Number(query.id),
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};

export default Playlist;

import Head from "next/head";
import Image from "next/image";
import GradientLayout from "../components/gradientLayout";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <GradientLayout subtitle='Profile' title='Sean Dillon' description='Yeet yeet yeet' color="red">
      <div>Home Page</div>
    </GradientLayout>
  );
};

export default Home;

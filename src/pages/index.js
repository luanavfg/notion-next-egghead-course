const Home = ({ quote }) => {
  return <p>{JSON.stringify(quote)}</p>;
};

export const getStaticProps = async () => {
  // fetch data
  const quote = await fetch("https://zenquotes.io/api/today").then((resp) =>
    resp.json()
  );

  return {
    props: {
      quote,
    },
  };
};
export default Home;

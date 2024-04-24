interface HomeProps {
  value: number;
}

const Home = ({ value }: HomeProps) => {
  return (
    <>
      <div>Giá trị sau khi click là: {value} </div>
    </>
  );
};

export default Home;

const ServerGen = ({ post }) => {

  const [count, setCount] = useState(0);
  const [info, setInfo] = useState('');

//   useEffect(() => {
//     // document.title = `You clicked ${count} - ${info} times`;
//   });

  return (
    <>
        <h1> Server Gen  </h1>
        <p> ::::: { post } </p>
    </>
  )
}


export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3000");
    console.log({
        res: res.data
    })
    const posts = res.data;

    return {
      props: {
        post : posts,
      },
    }
}

export default ServerGen
const Index = ({ nav }) => {
  return (
    <>
        <NavComponent />
    </>
  )
}

export async function getStaticProps() {
  console.log("getStaticProps Home Page")
  return {
    props: {
      nav: "Oke"
    }
  }
}

export default Index
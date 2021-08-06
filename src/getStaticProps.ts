export async function getStaticProps(context:any) {
    const res = await fetch(`https://api.covid19api.com/summary`)
    const data = await res.json()
  console.log(context)
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { data }, // will be passed to the page component as props
    }
  }
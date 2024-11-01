import { useState, useEffect } from "react";

interface Props{
    url: string;
  }

const useFetch = ({url} : Props) => {

    const [data, setData] = useState(null);//useState management
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const abortCont = new AbortController(); 

        fetch(url, { signal: abortCont.signal })
          .then(res => {
              console.log(res);
              if(!res.ok){
              throw Error('Could not fetch data from the endpoint.');
              }
              return res.json();
          })
          .then(data => {
              //console.log(data.data.values);
              setData(data.data);
              setIsPending(false);
              setError(null);
          })
          .catch(err => {
            if(err.name === "AbortError"){
                console.log('Fetch aborted');
            }else{
                setIsPending(false);
                setError(err.message);
            }
            
          })

          return () => abortCont.abort();
  
      }, [url]);

      return {data, isPending, error}

}

export default useFetch;
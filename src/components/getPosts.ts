import { useState, useEffect } from "react";
import { Post, Posts } from "src/types";
export default function usePosts(){
  const [data, setData] = useState<Posts>();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          // append the api path to the current host
          window.location.protocol + "//" + window.location.host + "/api/posts?"
        )
      ).json() as Posts;

      // set state when the data received
      setData(data);
    };

    dataFetch();
  }, []);

  return data;
}
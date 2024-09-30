import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { useSearchParams } from "react-router-dom";
// import api from "../utils/api";

const Main = () => {
  const [params, setParams] = useSearchParams();

  // api isteğinde kullanılacak nesne
  const options = {
    params: {
      query: params.get("query"),
    },
  };

  //! axios kullanırsak hata, loading ve durum stateleri tutmamız
  //! gerekecek fazla kod yazmış olacağız o yuzden bunu kaldırıp yerine useQuery kullandık
  // sayfaya girildiğinde filmleri almak için api isteği at
  //   useEffect(() => {
  //     api
  //       .get("/api/movies")
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   }, []);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies", options],
    queryFn: () => api.get("/api/movies", options).then((res) => res.data),
  });
  // console.log(isLoading, data, error);
  // console.log("hata ", error);
  //console.log(error.res ? error.res.data : error.message);
  return (
    <div className="">
      <Hero />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5 md:px-10 mt-10">
            {data?.map((movie) => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Main;

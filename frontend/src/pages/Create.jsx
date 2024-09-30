import InputField from "../components/inputField";
import { inputs } from "../utils/constants";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //inputlardaki verileri al nesne şeklinde
    //! formData formu yönetmeye yarayan nesne bu nesne içinde formu diziye çevirme methıdu yok ama formu objeye çevire methodu var o yüzden formdata.entries() ile önce diziye çevirdik sonra Object.fromEntries ilede diziyi objeye çevirdik

    const formdata = new FormData(e.target);
    const movieData = Object.fromEntries(formdata.entries());
    // console.log(movieData);

    //! e.target[0].value; bu şekilde tek tek almamak için form entries kullandık
    // e.target[1].value;
    // e.target[2].value;
    // e.target[3].value;
    // e.target[4].value;

    // kategorileri ve ekibi diziye çeviriyoruz virgüle göre ayıracağız
    movieData.genre = movieData.genre.split(",");
    movieData.cast = movieData.cast.split(",");
    console.log(movieData);

    //apiye film oluşturmak için http isteği at
    api
      .post("/api/movies", movieData)
      // .then(() => console.log("Başarılı"))
      .then((res) => {
        //bildirim gönder
        toast.success("Film başarıyla eklendi");

        //detay sayfasına yönlendir
        navigate(`/movie/${res.data.id}`);
      })
      .catch((err) => {
        // console.log("başarısız oldu", err)
        toast.error("Üzgünüz işlem başarısız");
      });
  };
  return (
    <div className="bg-yellow-600 flex-1 grid place-items-center px-5 py-8">
      <div className="bg-white w-full max-w-[800px] p-10 rounded shadow-lg ">
        <h1 className="text-3xl font-semibold mb-6">Yeni Film Oluştur</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 "
        >
          {inputs.map((props) => (
            <InputField {...props} />
          ))}
          {/* <InputField name="title" label="Başlık" />
          <InputField name="description" label="Açıklama" />
          <InputField name="rating" label="Puan" type="number" />
          <InputField name="year" label="Yıl" type="number" />
          <InputField name="director" label="Yönetmen" />
          <InputField name="duration" label="Süre" type="number" />
          <InputField name="language" label="Dil" />
          <InputField name="cast" label="Ekip ( , ile ayırınız'" />
          <InputField name="genre" label="Kategoriler ( , ile ayırınız" /> */}

          <button className="shadow border py-3 rounded-lg hover:shadow-lg hover:bg-gray-200 transition">
            Oluştur
          </button>
        </form>

        {/* <div classname='md:mt-10'>
          <img src="./movie-bg.jpg" className="rounded-full max-h-[300px]" />
        </div> */}
      </div>
    </div>
  );
};

export default Create;

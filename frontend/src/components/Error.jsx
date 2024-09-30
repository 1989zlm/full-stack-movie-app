const Error = ({ info, refetch }) => {
  return (
    <div className="my-10 text-center bg-red-500 p-5 rounded-md max-w-[500px] mx-auto text-white">
      <h1>Üzgünüz bir hata oluştu</h1>

      <h1>{info.message}</h1>

      <button
        onClick={refetch}
        className="border rounded-md px-3 py-1 mt-5 hover:bg-white hover:text-black transition"
      >
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;

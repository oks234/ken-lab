import { useState } from "react";
import { API_BASE_URL } from "../constants";
import { ClipLoader } from "react-spinners";

interface ICbs {
  isoDate: string;
  mp3: string;
}

export default function QtCbs() {
  const [isLoading, setLoading] = useState(false);
  const [cbs, setCbs] = useState<ICbs>();

  const onBtnClick = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL + "bible-today/cbs");
      const cbs = await res.json();
      setCbs(cbs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>CBS</h2>
      {cbs ? (
        <audio controls>
          <source src={cbs.mp3}></source>
        </audio>
      ) : (
        <button
          onClick={onBtnClick}
          className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
        >
          {isLoading && (
            <ClipLoader className="mr-1" size={12} color={"white"} />
          )}
          CBS
        </button>
      )}
    </section>
  );
}

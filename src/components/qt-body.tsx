import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL } from "../constants";

interface IQtBody {
  isoDate: string;
  koTitle: string;
  enTitle: string;
  range: string;
  verses: {
    num: number;
    info: string;
  }[];
}

export default function QtBody(
  { translation }: { translation: string } = { translation: "개역개정" }
) {
  const [isLoading, setLoading] = useState(false);
  const [qtBody, setQtBody] = useState<IQtBody>();

  const onBtnClick = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}bible-today?translation=${translation}`
      );
      const qtBody = await res.json();
      setQtBody(qtBody);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>{`매일성경 - ${translation}`}</h2>
      {qtBody ? (
        <p>{JSON.stringify(qtBody)}</p>
      ) : (
        <button
          onClick={onBtnClick}
          className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
        >
          {isLoading && (
            <ClipLoader className="mr-1" size={12} color={"white"} />
          )}
          {translation}
        </button>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL, dateString } from "../constants";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface IVerse {
  num: number;
  info: string;
}

interface IQtBody {
  dateString: string;
  koTitle: string;
  enTitle: string;
  range: string;
  verses: IVerse[];
}

function Verse({ num, info }: IVerse) {
  return (
    <>
      <span className="text-right">{num}</span> <span>{info}</span>
    </>
  );
}

function Verses({ verses }: { verses: IVerse[] }) {
  const maxNum = verses
    .map(({ num }) => num)
    .reduce((prev, curr) => (prev >= curr ? prev : curr), 0);
  const style: React.CSSProperties | undefined = {
    gridTemplateColumns: `${maxNum < 10 ? 1 : maxNum < 100 ? 1.5 : 2}rem auto`,
  };
  console.log({ maxNum, style });

  return (
    <div
      className="grid grid-cols-[2rem_auto] gap-x-1 gap-y-1 leading-normal"
      style={style}
    >
      {verses.map((verse) => (
        <Verse key={verse.num} {...verse} />
      ))}
    </div>
  );
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
      const qtBodyExceptDateString: Omit<IQtBody, "dateString"> =
        await res.json();
      const qtBody = { ...qtBodyExceptDateString, dateString };
      setQtBody(qtBody);
      await addDoc(collection(db, "todayBibleBodies"), qtBody);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "todayBibleBodies"),
          where("dateString", "==", dateString)
        )
      );

      if (!querySnapshot.empty) {
        const qtBody = querySnapshot.docs[0].data() as IQtBody;
        setQtBody(qtBody);
      }
    })();
  }, []);

  return (
    <section>
      <h2>{`매일성경 - ${translation}`}</h2>
      {qtBody ? (
        <article className="bg-slate-100 p-4 rounded-xl">
          <h3 className="mb-4 font-bold">
            {qtBody.koTitle} {qtBody.range}
          </h3>
          <Verses verses={qtBody.verses} />
        </article>
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

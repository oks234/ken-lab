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

export default function QtBody() {
  const [qtBody, setQtBody] = useState<IQtBody>();

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
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}bible-today`);
        const qtBodyExceptDateString: Omit<IQtBody, "dateString"> =
          await res.json();
        const qtBody = { ...qtBodyExceptDateString, dateString };
        setQtBody(qtBody);
        await addDoc(collection(db, "todayBibleBodies"), qtBody);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <section>
      <h2>매일성경</h2>
      <article className="relative bg-slate-100 p-4 rounded-xl">
        {qtBody ? (
          <>
            <h3 className="mb-4 font-bold">
              {qtBody.koTitle} {qtBody.range}
            </h3>
            <Verses verses={qtBody.verses} />
          </>
        ) : (
          <ClipLoader />
        )}
      </article>
    </section>
  );
}

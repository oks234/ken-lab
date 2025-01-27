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
      {verses.map((verse, index) => (
        <Verse key={`${verse.num}-${index}`} {...verse} />
      ))}
    </div>
  );
}

export default function QtBody() {
  const [qtBody, setQtBody] = useState<IQtBody>();

  async function copy() {
    if (!qtBody) return alert("복사할 내용이 없습니다.");
    const content = ""
      .concat(`${qtBody.koTitle} ${qtBody.range}\n\n`)
      .concat(
        qtBody.verses.reduce(
          (result, verse, index) =>
            result + (index === 0 ? "" : "\n") + verse.num + " " + verse.info,
          ""
        )
      );
      await navigator.clipboard.writeText(content);
      alert('본문을 복사했습니다.\n\n' + content);
    return content;
  }

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
      <h2>매일성경 (개역개정)</h2>
      <article className="relative p-4 bg-slate-100 rounded-xl">
        <button
          className="absolute px-1.5 text-sm border border-current top-4 right-4"
          disabled={!qtBody}
          onClick={copy}
          type="button"
        >
          복사하기
        </button>
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

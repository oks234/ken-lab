import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL, dateString } from "../constants";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface ICbs {
  dateString: string;
  mp3: string;
  pageUri?: string;
}

export default function QtCbs() {
  const [cbs, setCbs] = useState<ICbs>();
  const mp3Name = cbs?.mp3.slice(cbs?.mp3.lastIndexOf("/") + 1) || "";

  useEffect(() => {
    (async () => {
      const audiosQuery = await getDocs(
        query(
          collection(db, "todayBibleAudios"),
          where("dateString", "==", dateString)
        )
      );

      if (!audiosQuery.empty) {
        const cbs = audiosQuery.docs[0].data() as ICbs;
        setCbs(cbs);
        return;
      }

      try {
        const res = await fetch(API_BASE_URL + "bible-today/cbs");
        const { mp3, pageUri } = await res.json();
        const cbs = { dateString, mp3, pageUri };
        setCbs(cbs);
        await addDoc(collection(db, "todayBibleAudios"), cbs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <section>
      <h2>CBS (박대영 목사님)</h2>
      {cbs ? (
        <>
          <audio controls className="w-full">
            <source src={cbs.mp3}></source>
          </audio>
          <div className="space-x-2">
            <a download={mp3Name} href={cbs.mp3}>
              다운로드
            </a>
            <a href={cbs.pageUri} target="_blank">
              페이지 이동
            </a>
          </div>
        </>
      ) : (
        <ClipLoader size={12} />
      )}
    </section>
  );
}

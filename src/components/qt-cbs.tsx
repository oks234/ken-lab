import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL, dateString } from "../constants";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface ICbs {
  dateString: string;
  mp3: string;
}

export default function QtCbs() {
  // const [isLoading, setLoading] = useState(false);
  const [cbs, setCbs] = useState<ICbs>();

  // const onBtnClick = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(API_BASE_URL + "bible-today/cbs");
  //     const { mp3 } = await res.json();
  //     const cbs = { dateString, mp3 };
  //     setCbs(cbs);
  //     await addDoc(collection(db, "todayBibleAudios"), cbs);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        const { mp3 } = await res.json();
        const cbs = { dateString, mp3 };
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
        <audio controls className="w-full">
          <source src={cbs.mp3}></source>
        </audio>
      ) : (
        <ClipLoader size={12} />
      )}
    </section>
  );
}

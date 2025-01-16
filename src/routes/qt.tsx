import QtBody from "../components/qt-body";
import QtCbs from "../components/qt-cbs";
import { days } from "../constants";

export default function Qt() {
  return (
    <div className="container space-y-8">
      <h1>
        오늘의 묵상 - <span>{new Date().toLocaleDateString()}</span>{" "}
        <span>{days[new Date().getDay()]}</span>
      </h1>
      <QtBody translation="개역개정" />
      {/* <QtBody translation="새번역" /> */}
      <QtCbs />
    </div>
  );
}

import QtBody from "../components/qt-body";
import QtCbs from "../components/qt-cbs";

export default function Qt() {
  return (
    <div className="container space-y-8">
      <h1>오늘의 묵상</h1>
      <QtBody translation="개역개정" />
      {/* <QtBody translation="새번역" /> */}
      <QtCbs />
    </div>
  );
}

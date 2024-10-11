import { WordPage } from "../../containers/WordPage";
import { useRef } from "react";
import { MainTable } from "../../components/MainTable";
import { TableOfContents } from "../../components/TableOfContents";

export function MainPage() {
  const mainTable = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);


  return <>
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <TableOfContents pages={[
        {name: "Таблица", page: mainTable},
        {name: "", page: page2Ref},
        {name: "", page: page3Ref},
      ]} />
      <div className="snap-start">
        <WordPage refProp={ mainTable }><MainTable/></WordPage>
      </div>
      <div className="snap-start">
        <WordPage refProp={ page2Ref }>WordPage 2 Content</WordPage>
      </div>
      <div className="snap-start">
        <WordPage refProp={ page3Ref }>WordPage 3 Content</WordPage>
      </div>
    </div>
  </>
}
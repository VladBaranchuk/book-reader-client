import React, { useContext, useEffect } from "react"
import Catalogue from "../catalogue/Catalogue"
import ContentView from "../contentView/ContentView"
import Panel from "../panel/Panel"
import useEpubReader, { EpubReaderState } from "../../hooks/useEpubReader"
import Snackbar from "../snackbar"
import { MyContext } from "../layout/layout"

export interface IReaderProps {
  bookId: string,
  url: string,
  epubOptions?: Object
}

export const readerContext = React.createContext<EpubReaderState>(null);

function Reader(props: IReaderProps) {
  const epubReaderState = useEpubReader(props);
  const context = useContext(MyContext);
  context.setFalse();
  return (
    <readerContext.Provider value={epubReaderState}>
      <Snackbar></Snackbar>
      <Panel></Panel>
      <Catalogue></Catalogue>
      <ContentView></ContentView>
    </readerContext.Provider>
  )
}

export default Reader

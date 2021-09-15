import * as React from "react"
import {motion} from "framer-motion"
import {useMediaQuery} from "react-responsive"

import Window from "../components/Window/Window"

import styles from "./App.module.scss"

const App: React.FC = () => {
  const constraintRef = React.useRef(null)
  const [servers, setServers] = React.useState<number>(4)
  const [array, setArray] = React.useState<number[]>([1, 2, 3, 4])
  const [update, setUpdate] = React.useState<boolean>(false)
  const [refresh, setRefresh] = React.useState<boolean>(false)
  const isMobile = useMediaQuery({maxWidth: 764})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServers(parseInt(event.target.value))
  }

  const changeServers = (m: "add" | "sub") => {
    const aux = servers

    console.log(aux)
    if (m === "add") setServers(aux + 1)
    else setServers(aux - 1)
    setUpdate(true)
  }

  React.useEffect(() => {
    const aux = []

    if (servers !== 0 && !isNaN(servers)) {
      for (let i = 0; i !== servers; i++) {
        aux.push(i)
      }
    }

    if (update === true) {
      setArray(aux)
      setUpdate(false)
    }
  }, [servers, array, update])

  React.useEffect(() => {
    if (refresh === true) setRefresh(false)
  }, [refresh])

  return (
    <main className={styles.container}>
      {!isMobile && (
        <button
          style={{position: "absolute", right: 10, top: 10, zIndex: 10}}
          onClick={() => setRefresh(true)}
        >
          Refresh
        </button>
      )}
      {isMobile && !refresh && (
        <>
          <div className={`window ${styles.window}`}>
            <div className="title-bar">
              <div className="title-bar-text">Innovid challenge</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" />
                <button aria-label="Maximize" />
                <button aria-label="Close" />
              </div>
            </div>
            <div className="window-body">
              <div className="field-row">
                <label htmlFor="servers">Servers</label>
                {servers > 0 && <button onClick={() => changeServers("sub")}>-</button>}
                {servers < 4 && <button onClick={() => changeServers("add")}>+</button>}
              </div>
            </div>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              {array.map((elem) => (
                <Window key={elem} numb={elem} />
              ))}
            </div>
          </div>
        </>
      )}
      {!isMobile && !refresh && (
        <>
          <motion.div
            ref={constraintRef}
            style={{
              width: "100%",
              minHeight: "100%",
              height: "100vh",
              position: "absolute",
            }}
          />
          <motion.div
            drag
            dragConstraints={constraintRef}
            style={{
              position: "absolute",
              cursor: "grab",
              top: "8%",
              left: "40%",
              zIndex: 2,
            }}
          >
            <div className={`window ${styles.window}`}>
              <div className="title-bar">
                <div className="title-bar-text">Innovid challenge</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize" />
                  <button aria-label="Maximize" />
                  <button aria-label="Close" />
                </div>
              </div>
              <div className="window-body">
                <div className="field-row">
                  <label htmlFor="servers">Servers</label>
                  {servers > 0 && <button onClick={() => changeServers("sub")}>-</button>}
                  {servers < 4 && <button onClick={() => changeServers("add")}>+</button>}
                </div>
              </div>
            </div>
          </motion.div>
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              {array.map((elem) => (
                <motion.div
                  key={elem}
                  drag
                  dragConstraints={constraintRef}
                  style={{position: "relative", cursor: "grab"}}
                >
                  <Window numb={elem} />
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default App

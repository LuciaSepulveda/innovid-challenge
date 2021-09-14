import * as React from "react"
import {motion} from "framer-motion"

import Window from "../components/Window/Window"

import styles from "./App.module.scss"

const App: React.FC = () => {
  const constraintRef = React.useRef(null)
  const [servers, setServers] = React.useState<number>(0)
  const [array, setArray] = React.useState<number[]>([1, 2, 3, 4])
  const [update, setUpdate] = React.useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServers(parseInt(event.target.value))
  }

  const changeServers = () => {
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

  return (
    <main className={styles.container}>
      <motion.div
        ref={constraintRef}
        style={{
          width: "100%",
          minHeight: "100%",
          position: "absolute",
        }}
      />
      <motion.div
        drag
        dragConstraints={constraintRef}
        style={{position: "absolute", cursor: "grab", top: "8%", left: "40%", zIndex: 2}}
      >
        <div className="window" style={{width: 270, margin: "auto"}}>
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
              <input id="servers" type="text" onChange={handleChange} />
              <button onClick={() => changeServers()}>OK</button>
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
    </main>
  )
}

export default App

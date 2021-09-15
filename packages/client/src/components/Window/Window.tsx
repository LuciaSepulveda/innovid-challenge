import axios from "axios"
import * as React from "react"

import cpuOff from "../../assets/pc-off.png"
import cpuOn from "../../assets/pc-on.gif"

import styles from "./Window.module.scss"

interface Props {
  numb: number
}

const Window: React.FC<Props> = ({numb}) => {
  const [status, setStatus] = React.useState<boolean>(true)
  const [cpu, setCpu] = React.useState<number>(0)
  const [state, setState] = React.useState<"init" | "ready">("init")
  const imageRef = React.useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = React.useState<boolean>(false)

  const changeStatus = () => {
    if (status === true) {
      setCpu(0)
      setStatus(false)
    }
    if (status === false) {
      setState("init")
      setStatus(true)
    }
  }

  React.useEffect(() => {
    if (state === "init") {
      const getCpu = async () => {
        const data = await axios.get(`http://localhost:8000/status/:${numb}`)

        setCpu(data.data.load)
      }

      getCpu()
      setState("ready")
    }
    if (state === "ready") {
      const cpuInterval = setInterval(async () => {
        const data = await axios.get(`http://localhost:8000/status/:${numb}`)

        setCpu(data.data.load)
      }, 5000)

      if (status === false) {
        setCpu(0)
        clearInterval(cpuInterval)
      }

      return () => clearInterval(cpuInterval)
    }
  }, [status, state])

  React.useEffect(() => {
    if (!loaded && imageRef.current?.complete && imageRef.current?.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [loaded])

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{`Server ${numb}`}</div>
      </div>
      <div className="window-body">
        {status && (
          <img ref={imageRef} className={styles.image} src={cpuOn} onLoad={() => setLoaded(true)} />
        )}
        {!status && (
          <img
            ref={imageRef}
            className={styles.image}
            src={cpuOff}
            onLoad={() => setLoaded(true)}
          />
        )}
        {!loaded && <div className={styles.loaderImage} />}
        <div className="status-bar">
          <p className={`status-bar-field ${styles.statusBar}`}>
            {status === true && "Status: ON"}
            {status === false && "Status: OFF"}
          </p>
          <p
            className={`status-bar-field ${styles.statusBarButton}`}
            onClick={() => changeStatus()}
          >
            {status === false && "turn on"}
            {status === true && "shut down"}
          </p>
          <p className={`status-bar-field ${styles.statusBar}`}>{`CPU Usage: ${cpu}%`}</p>
        </div>
      </div>
    </div>
  )
}

export default Window

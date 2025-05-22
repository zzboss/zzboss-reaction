import { useState } from "react"
import {starsOptions, dateOptions} from './constants'
import { Radio, RadioChangeEvent } from "antd"
import styles from './index.module.css'
export default function Stars() {
  const [type, setType] = useState('today')
  const [star, setStar] = useState('白羊座')
  return (
    <>
    <div className={styles.date}>
      <Radio.Group
      size="small"
      value = {type}
      onChange={(ev: RadioChangeEvent) => setType(ev.target.value)}
      options={dateOptions}
      optionType="button"
      buttonStyle="solid"/>
    </div>
    <div className={styles.stars}>
      <Radio.Group
      size="small"
      value = {star}
      onChange={(ev: RadioChangeEvent) => setStar(ev.target.value)}
      options={starsOptions}
      optionType="button"
      buttonStyle="solid"/>
    </div>
    </>
  )
}

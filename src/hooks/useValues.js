import { useState, useEffect } from 'react'
import { DEFAULT_VALUES } from '../logic/constants'

export function useValues () {
  const [values, setValues] = useState(() => {
    const dataFromStorage = window.localStorage.getItem('values')
    return dataFromStorage ? JSON.parse(dataFromStorage) : DEFAULT_VALUES
  })
  const [amount, setAmount] = useState(0)
  const [total, setTotal] = useState(0)

  const updateValues = ({ name, value }) => {
    const newValue = Number(value)
    if (value === -1) {
      setValues(DEFAULT_VALUES)
      setAmount(0)
      setTotal(0)
    }

    const newValues = {
      ...values,
      [name]: newValue
    }

    window.localStorage.setItem('values', JSON.stringify(newValues))
    setValues((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  useEffect(() => {
    const { bill, tip, people } = values
    if (people === 0) return
    const tipAmount = (tip / 100) * bill
    const aproxAmount = parseFloat((tipAmount / people).toFixed(2))
    setAmount(aproxAmount)

    const newTotal = (bill + tipAmount) / people
    const aproxTotal = Math.floor(newTotal)
    setTotal(aproxTotal)
  }, [values])

  return { updateValues, amount, total, values }
}

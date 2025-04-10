import { useState, useEffect } from 'react'
import { defaultValues } from '../components/logic/constants'

export function useValues () {
  const [values, setValues] = useState(defaultValues)
  const [amount, setAmount] = useState(0)
  const [total, setTotal] = useState(0)

  const updateValues = ({ name, value }) => {
    const newValue = Number(value)
    if (value === -1) {
      setValues(defaultValues)
      setAmount(0)
      setTotal(0)
    }

    setValues((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  useEffect(() => {
    const { bill, tip, people } = values
    if (people === 0) return
    const tipAmount = (tip / 100) * bill
    const aproxAmount = Math.floor(tipAmount / people)
    setAmount(aproxAmount)

    const newTotal = (bill + tipAmount) / people
    const aproxTotal = Math.floor(newTotal)
    setTotal(aproxTotal)
  }, [values])

  return { updateValues, amount, total, values }
}

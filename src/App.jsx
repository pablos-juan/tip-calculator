import { useEffect, useMemo, useState } from 'react'
import { Value } from './components/Value'
import { TipButton } from './components/TipButton'
import './App.css'

const defaultValues = {
  bill: 0,
  tip: 0,
  people: 0
}

export function App () {
  const [amount, setAmount] = useState(0)
  const [total, setTotal] = useState(0)
  const [values, setValues] = useState(defaultValues)

  const updateValues = (event) => {
    const { name, value } = event.target
    const newValue = Number(value)

    setValues((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  const handleClick = (event) => {
    updateValues(event)
  }

  const handleChange = (event) => {
    updateValues(event)
  }

  useEffect(() => {
    const { bill, tip, people } = values
    if (people === 0) return
    const tipAmount = (tip / 100) * bill
    setAmount(tipAmount / people)

    const newTotal = (bill + tipAmount) / people
    setTotal(newTotal)
  }, [values])

  const newButtons = useMemo(() => {
    const percentage = [5, 10, 15, 25, 50]
    return percentage.map((n) => (
      <TipButton
        value={n}
        key={n}
        handleClick={handleClick}
        tip={values.tip}
      />
    ))
  }, [values.tip])

  return (
    <main>
      <img src='/public/images/logo.svg' alt='logo' />
      <section className='calc'>
        <section className='form-sec'>
          <form>
            <label>Bill</label>
            <input
              placeholder='0'
              type='number'
              name='bill'
              value={values.bill === 0 ? '' : values.bill}
              className='bill-input'
              onChange={handleChange}
            />

            <fieldset>
              <label>Select Tip %</label>

              <div className='tips'>
                {newButtons}
                <input
                  type='number'
                  placeholder='Custom'
                  className='custom-input'
                  name='tip'
                  /* value={customTip} */
                  onChange={handleChange}
                />
              </div>
            </fieldset>

            <label>Number of People</label>
            <input
              placeholder='1'
              type='number'
              className='people-input'
              name='people'
              value={values.people === 0 ? '' : values.people}
              onChange={handleChange}
            />
          </form>
        </section>

        <section className='result'>
          <div>
            <Value value={amount} name='Tip Amount' />
            <Value value={total} name='Total' />
          </div>
          <button
            className='reset'
            onClick={() => {
              setValues(defaultValues)
              setAmount(0)
              setTotal(0)
            }}
          >
            RESET
          </button>
        </section>
      </section>
    </main>
  )
}

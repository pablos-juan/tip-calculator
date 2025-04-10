import { useMemo } from 'react'
import { Value } from './components/Value'
import { TipButton } from './components/TipButton'
import { percentage } from './logic/constants'
import { useValues } from './hooks/useValues'
import './App.css'

export function App () {
  const { updateValues, amount, total, values } = useValues()

  const handleClick = (event) => {
    const { name, value } = event.target
    updateValues({ name, value })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (value.length > 8 && name === 'bill') return
    if (value.length > 2 && name === 'tip') return
    updateValues({ name, value })
  }

  const newButtons = useMemo(() => {
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
      <img src='/images/logo.svg' alt='logo' />
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
                  value={percentage.includes(values.tip) || values.tip === 0 ? '' : values.tip}
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
            disabled={values.bill === 0 && values.tip === 0 && values.people === 0}
            onClick={() => {
              updateValues({ name: '', value: -1 })
            }}
          >
            RESET
          </button>
        </section>
      </section>
    </main>
  )
}

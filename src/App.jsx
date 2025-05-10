import { useMemo, useState } from 'react'
import { Value } from './components/Value'
import { TipButton } from './components/TipButton'
import { PERCENTAGE } from './logic/constants'
import { useValues } from './hooks/useValues'
import './App.css'
import { Favs } from './components/Favs'
import { Banner } from './components/Banner'

export function App () {
  const { updateValues, amount, total, values } = useValues()
  const [fav, setFav] = useState(() => {
    const favFromStorage = window.localStorage.getItem('fav')
    return favFromStorage ? JSON.parse(favFromStorage) : []
  })

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

  const handleFav = () => {
    if (
      fav.some(f => f.tip === values.tip && f.people === values.people) ||
      fav.length > 2
    ) return
    const { tip, people } = values
    setFav(prev => [...prev, { tip, people }])
    window.localStorage.setItem('fav', JSON.stringify([...fav, { tip, people }]))
  }

  const newButtons = useMemo(() => {
    return PERCENTAGE.map((n) => (
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
      <Banner />
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

            {fav.length > 0 && (
              <Favs favs={fav} updateValues={updateValues} updateFav={setFav} />
            )}

            <fieldset>
              <label>Select Tip %</label>

              <div className='tips'>
                {newButtons}
                <input
                  type='number'
                  placeholder='Custom'
                  className='custom-input'
                  name='tip'
                  value={PERCENTAGE.includes(values.tip) || values.tip === 0 ? '' : values.tip}
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
          <article>
            <Value value={amount} name='Tip Amount' />
            <Value value={total} name='Total' />
          </article>
          <div className='buttons'>
            <button
              className={values.bill !== 0 ? 'reset-min' : 'reset'}
              disabled={values.bill === 0 && values.tip === 0 && values.people === 0}
              onClick={() => {
                updateValues({ name: 'value', value: -1 })
                window.localStorage.removeItem('values')
              }}
            >
              RESET
            </button>

            {values.bill > 0 &&
              <button
                className='second-button'
                onClick={handleFav}
              >♡
              </button>}
          </div>
        </section>
      </section>
    </main>
  )
}

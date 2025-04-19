import './favs.css'

export function Favs ({ favs, updateValues, updateFav }) {
  const handleClick = (fav) => {
    const { people, tip } = fav
    updateValues({ name: 'tip', value: tip })
    updateValues({ name: 'people', value: people })
  }

  const handleRemove = () => {
    updateFav([])
    window.localStorage.removeItem('fav')
  }

  const renderButtons = () => {
    return favs.map((fav) => (
      <button
        key={fav.tip + fav.people}
        className='fav-button'
        onClick={() => handleClick(fav)}
        type='button'
      >
        <p>🚹:{fav.people}</p>
        <p>%{fav.tip}</p>
      </button>
    ))
  }

  return (
    <div className='fav'>
      {renderButtons()}
      {favs.length > 0 && <button onClick={handleRemove} type='button' className='remove'>☓</button>}
    </div>
  )
}

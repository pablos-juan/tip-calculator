export function Value ({ name, value }) {
  const len = value.toString().length
  const min = len > 5 ? 'min' : ''
  return (
    <article className='value'>
      <div>
        <h2>{name}</h2>
        <p>/ person</p>
      </div>
      <aside>
        <img
          src='/public/images/icon-dollar.svg'
          alt='dollar icon'
          className={`dollar-icon ${min}`}
        />
        <p className={min}>
          {value}
        </p>
      </aside>
    </article>
  )
}

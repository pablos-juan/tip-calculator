export function TipButton ({ handleClick, value, tip }) {
  return (
    <button
      onClick={handleClick}
      className={tip === value ? 'active' : ''}
      type='button'
      value={value}
      name='tip'
    >
      {value}%
    </button>
  )
}

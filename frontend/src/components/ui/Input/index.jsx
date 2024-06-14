import style from './style.module.scss'

export const Input = ({
  register,
  validationSchema,
  name = '',
  id = '',
  value = '',
  placeholder = '',
  onChange = () => {},
  error = '',
}) => {
  const inputProps = register
    ? { ...register(name, validationSchema) }
    : { value: value, onChange: event => onChange(event.target.value) }

  return (
    <div className={style.line}>
      <input
        {...inputProps}
        name={name}
        id={id}
        placeholder={placeholder}
        className={style.input}
        type='text'
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  )
}

import React, { ChangeEvent, useState } from 'react'
import themes from '../../../themes'

const ThemePicker = () => {
  const [theme, setTheme] = useState(themes[0])

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
    document.querySelector('html')?.setAttribute('data-theme', e.target.value)
  }

  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>Select Theme</span>
      </label>
      <select
        className='select select-bordered'
        value={theme}
        onChange={handleThemeChange}
      >
        {themes.map((themeOption) => (
          <option key={themeOption} value={themeOption}>
            {themeOption}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ThemePicker
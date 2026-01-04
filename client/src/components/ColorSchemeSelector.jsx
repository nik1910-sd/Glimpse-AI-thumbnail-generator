import React from 'react'
import { colorSchemes } from '../../assets/Assets';

const ColorSchemeSelector = ({value,onChange}) => {
  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-zinc-200'>Color Scheme</label>
      <div className='grid grid-cols-6 gap-3'>
        {colorSchemes.map((scheme))}
        <button key={ColorSchemeSelector.id}>

        </button>
      </div>
    </div>
  )
}

export default ColorSchemeSelector
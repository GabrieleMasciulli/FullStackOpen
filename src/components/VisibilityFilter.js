import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      all
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('ALL'))}
      />
      <br />
      important{' '}
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      <br />
      non important
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('NON_IMPORTANT'))}
      />
      <br />
    </div>
  )
}

export default VisibilityFilter

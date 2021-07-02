import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10,
  }

  const handleChange = e => {
    const filter = e.target.value
    dispatch(changeFilter(filter))
  }

  return (
    <div style={style}>
      filter <input type='text' name='filter' onChange={handleChange} />
    </div>
  )
}

export default Filter

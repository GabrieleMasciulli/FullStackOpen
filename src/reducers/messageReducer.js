const reducer = (state = '', action) => {
  // console.log(state)

  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message

    case 'REMOVE_MESSAGE':
      return ''

    default:
      return state
  }
}

let timeout

export const setNotification = (message, timeoutInseconds) => {
  return async dispatch => {
    if (timeout) clearTimeout(timeout)

    dispatch({
      type: 'SET_MESSAGE',
      message,
    })

    timeout = setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE',
      })
    }, timeoutInseconds * 1000)
  }
}

export default reducer

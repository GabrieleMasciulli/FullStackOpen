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

export const setNotification = (message, timeoutInseconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message,
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE',
      })
    }, timeoutInseconds * 1000)
  }
}

export default reducer

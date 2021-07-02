const initialState = 'Notifications go here'

const reducer = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message

    default:
      return state
  }
}

export const messageChange = message => {
  return {
    type: 'SET_MESSAGE',
    message,
  }
}

export default reducer

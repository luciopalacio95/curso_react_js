import { AUTO_LANGUAGE } from '../constants'
import { Action, FromLanguage, Language, type State } from '../types.d'
import { useReducer } from 'react'

// 1. create a initialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2. create a reducer
function reducer (state: State, action: Action) {
  const { type } = action
  switch (type) {
    case 'INTERCHANGE_LANGUAGES':
      // podemos usar logica dentro de los reducer
      if (state.fromLanguage === AUTO_LANGUAGE) return state
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        loading: state.fromText !== '',
        result: '',
        fromText: state.result
      }
    case 'SET_FROM_LANGUAGE':
      if (state.fromLanguage === action.payload) return state
      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading: state.fromText !== ''
      }
    case 'SET_TO_LANGUAGE':
      if (state.toLanguage === action.payload) return state
      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading: state.fromText !== ''
      }
    case 'SET_FROM_TEXT':
      return {
        ...state,
        fromText: action.payload,
        result: '',
        loading: action.payload !== ''
      }
    case 'SET_RESULT':
      return {
        ...state,
        loading: false,
        result: action.payload
      }
    default:
      return state
  }
}

export function useStore () {
  // 3. usar el hook useReducer
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}

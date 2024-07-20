import {addNewUser, deleteUserById, UserId, modifyUser} from "../store/users/slice"
import { useAppDispatch } from './store';

export const useUserActions = () => {
  const dispatch = useAppDispatch()

	const addUser = ({ name, email, github }) => {
    dispatch(addNewUser({name, email, github}))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }
  
	const editUser = ({id, name, email, github }) => {
    dispatch(modifyUser({id, name, email, github}))
  }

  return { addUser, removeUser, editUser };
}
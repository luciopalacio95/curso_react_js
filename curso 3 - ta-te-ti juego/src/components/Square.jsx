export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleBoard = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleBoard} className={className}>
      {children}
    </div>
  )
}

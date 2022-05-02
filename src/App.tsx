import styled, { createGlobalStyle } from "styled-components";
// import ToDoList from "./component/ToDoList";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import DraggableCard from "./Component/DraggableCard";
import Board from "./Component/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        
        const boardCopy = [...allBoards[source.droppableId]];
        const target = boardCopy[source.index]
        boardCopy.splice(source?.index, 1);
        boardCopy.splice(destination?.index, 0, target);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy
        }
      });
    }else{
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const target = sourceBoard[source.index]
        sourceBoard.splice(source?.index, 1);
        const destinationBoard = [...allBoards[destination.droppableId]];
        destinationBoard.splice(destination?.index, 0, target);
        return {
          ...allBoards,
          [source.droppableId] : sourceBoard,
          [destination.droppableId] : destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;

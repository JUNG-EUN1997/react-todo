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

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 8px;
  min-height: 100px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
`;

// recoil 작업 들어가기 #6.5 Reordering
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    //dragging finish event
    console.log(draggableId);
    if (!destination) return;

    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      console.log(copyToDos)
      copyToDos.splice(source?.index, 1);
      console.log('delete item')
      console.log(copyToDos)
      console.log('put back ',draggableId)
      copyToDos.splice(destination?.index, 0, draggableId);
      console.log(copyToDos)
      return copyToDos;
    });
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable draggableId={toDo} index={index} key={toDo}>
                      {/* key & draggableId must same! */}
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                          {...magic.dragHandleProps}
                        >
                          <span>😀</span>
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;

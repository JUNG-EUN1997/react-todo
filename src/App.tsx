import styled, { createGlobalStyle } from "styled-components";
import ToDoList from "./component/ToDoList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

const toDos = ["a", "b", "c", "d", "e"];
console.log(toDos);

function App() {
  const onDragEnd = () => {};
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps} >
                  {toDos.map((toDo, index) => (
                    <Draggable draggableId={toDo} index={index}>
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
      {/* 
      <ToDoList /> */}
    </>
  );
}

export default App;

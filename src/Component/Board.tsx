import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 0;
  padding-top: 30px;
  border-radius: 8px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  background-color: ${(props) => (props.isDraggingOver ? "#dfe6e9" : props.draggingFromThis ? "#b2bec3" : "transparent")};
  transition: background-color .5s;
  padding: 20px 10px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 12px;
  font-weight: bold;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

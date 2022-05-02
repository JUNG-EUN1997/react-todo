import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  background-color: ${(props) =>
    props.isDragging ? "#6fc1ff" : props.theme.cardColor};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  // 부모 state가 바뀌면, 전체가 다시 render됨
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {/* key & draggableId must same! */}
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <span></span>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard); // prop이 바뀐만 다시 rendering 됨

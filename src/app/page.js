'use client'
import SingleCard from "@/components/SingleCard";
import { useEffect, useState } from "react";
import { resetServerContext } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {v4 as uuidv4 } from 'uuid';

export default function Home() {
  resetServerContext();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(process.browser);
  }, [])

  const [players,setPlayers] = useState([
    {id:uuidv4(),name:"Lebron James",location:"LOS ANGELES LAKERS",src:"lebron.png"},
    {id:uuidv4(),name:"Stephen Curry",location:"GOLDEN STATE WARRIORS",src:"steph.png"},
    {id:uuidv4(),name:"Niokla Jokic",location:"DENVER NUGGETS",src:"jokic.png"},
    {id:uuidv4(),name:"Kevin Durant",location:"PHOENIX SUNS",src:"kd.png"},
    {id:uuidv4(),name:"Jayson Tatum",location:"BOSTON CELTICS",src:"jt.png"},

  ]);


  const handleDragDrop = (results) => {
    console.log("result",results);
    const { source, destination,type} = results;

    if(!destination) return;
    if(source.droppableId===destination.droppableId && source.index === destination.index) return;

    if (type === 'group'){
       const reorderedPlayers = [...players,]
       const sourceIndex = source.index;

       const destinationIndex = destination.index;

       const [removedPlayer] = reorderedPlayers.splice(sourceIndex,1);
       reorderedPlayers.splice(destinationIndex,0,removedPlayer);
       return setPlayers(reorderedPlayers);
    }
  }
 

  return (
    < >
   <h2 className="flex items-center justify-center text-5xl font-bold m-10">Top Player</h2>
   {/* <img src="./ref.PNG" className="w-100"/> */}
   {isBrowser ?
   <DragDropContext onDragEnd={handleDragDrop}>
   <Droppable droppableId="ROOT" type="group"  >
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {players.map((player,index)=>  ( 
          <Draggable draggableId={player.id} key={player.id} index={index}>
            {(provided) =>(
              <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                <SingleCard key={player.id} playerName={player.name} playerLocation={player.location} src={player.src} />

              </div>
            )}
          </Draggable>
          ))}

      </div>
    )}
   </Droppable>
   </DragDropContext>
   : null}
   </>
  );
}

import React from 'react'
import NoteCard from './NoteCard/NoteCard';

const noteCards = props => (
    <div className='note-cards' style={{padding: "40px 0"}}>
        <h2>Files</h2>
        <div className='card-deck' style={{display: "flex"}}>
            {props.data.collectionIds.map(collectionId => {
                return (
                    <NoteCard
                        key={collectionId}
                        id={collectionId}
                        title={props.data.collections[collectionId].title}
                        bookmark={props.data.collections[collectionId].bookmarked}
                    ></NoteCard>
                )
            })}
        </div>
    </div>
)

export default noteCards;
import React from 'react'
import NoteCard from './NoteCard/NoteCard';

const noteCards = ({data, folder}) => (
    <div className='note-cards'>
        <h2>Files</h2>
        <div className='card-deck' style={{display: "flex"}}>
            {data.map(collection => {
                return (
                    <NoteCard
                        key={collection.id}
                        id={collection.id}
                        folder={folder}
                        title={collection.title}
                        bookmark={collection.bookmarked}
                    ></NoteCard>
                )
            })}
        </div>
    </div>
)

export default noteCards;
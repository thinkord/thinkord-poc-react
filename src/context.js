import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
const StoreContext = React.createContext(null)


class StoreProvider extends Component {
    state = {
        data: {
            collections: {
                'collection-1': {
                    id: 'collection-1',
                    title: 'Todo',
                    blocks: [
                        {
                            id: 'block-1',
                            title: 'Learning how to cook',
                            content: 'I want to know the recipe'
                        }
                    ]
                }
            },
            collectionIds: ['collection-1']
        }
    }

    addBlock = (title, content, collectionId) => {
        const { data } = this.state
        const newBlockId = uuid()
        const newBlock = {
            id: newBlockId,
            title,
            content
        }
        const collection = data.collections[collectionId]
        collection.blocks = [...collection.blocks, newBlock]
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }
        this.setState({
            data: newState
        })
    }

    addCollection = (title) => {
        const { data } = this.state
        const newCollectionId = uuid()
        const newCollection = {
            id: newCollectionId,
            title,
            blocks: []
        }

        const newState = {
            collectionIds: [...data.collectionIds, newCollectionId],
            collections: {
                ...data.collections,
                [newCollectionId]: newCollection
            }
        }

        this.setState({
            data: newState
        })
    }

    deleteBlock = (collectionId, index) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        collection.blocks = [...collection.blocks.slice(0, index), ...collection.blocks.slice(index + 1)]
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }
        this.setState({
            data: newState
        })
    }

    updateCollectionTitle = (title, collectionId) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        collection.title = title
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }

        this.setState({
            data: newState
        })
    }

    updateBlockTitle = (title, collectionId, index) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        const blocks = collection.blocks
        const block = blocks[index]
        block.title = title
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: {
                    ...collection,
                    blocks
                }
            }
        }
        this.setState({
            data: newState 
        })
    }
    render() {
        return (
            <StoreContext.Provider value={{
                ...this.state,
                addBlock: this.addBlock,
                deleteBlock: this.deleteBlock,
                updateCollectionTitle: this.updateCollectionTitle,
                updateBlockTitle: this.updateBlockTitle,
                addCollection: this.addCollection
            }}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }
}

const StoreConsumer = StoreContext.Consumer




export { StoreProvider, StoreConsumer, StoreContext }
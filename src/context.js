import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
const StoreContext = React.createContext(null)


/*
 * [Please notice]
 * update data without mutating state: "using spread operator"
 * if you don't follow this rule, TimLo will kill it!
 * if you don't know spread operator: check this out
 * https://codeburst.io/javascript-the-spread-operator-a867a71668ca
 */

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

    /**
     * 
     * @param {string} title 
     * @param {string} content 
     * @param {number} collectionId 
     */
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

    /**
     * 
     * @param {string} title 
     */
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

    /**
     * 
     * @param {number} collectionId 
     * @param {number} index 
     */
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

    /**
     * 
     * @param {string} title
     * @param {number} collectionId 
     */
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

    /**
     * 
     * @param {string} title 
     * @param {number} collectionId 
     * @param {number} index 
     */
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
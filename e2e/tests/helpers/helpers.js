import { v4 as uuidv4 } from 'uuid';
import data from '../data/environments.json';
import board from '../pages/boardPage';
import item from '../pages/itemPage';


export const environment = () => {
    var env = process.env.TEST_ENVIRONMENT

    if (env === undefined || env == null) {
        env = "local"
    }

    return data[`${env.toLowerCase()}`]
}

export const randomString = () => {
    return uuidv4()
}

export const createNewBoard = async (boardName) => {
    await board.clickNewBoard()
    await board.typeBoardName(boardName)
    await board.clickAddboard()
}

export const createNewItem = async (itemTitle) => {
    await board.clickNewItem()
    await item.typeItemTitle(itemTitle)
    await item.clickAddItem()
}

export const createNewItemWithTask = async (itemTitle, taskName) => {
    await board.clickNewItem()
    await item.typeItemTitle(itemTitle)
    await item.clickAddTask()
    await item.typeTaskName(taskName)
    await item.clickAddItem()
}
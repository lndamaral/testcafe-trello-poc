import item from './pages/itemPage';
import board from './pages/boardPage';

import {
    randomString,
    createNewBoard,
    createNewItem,
    createNewItemWithTask,
    environment
} from './helpers/helpers';



fixture`Item Test Suite`
    .page(`${environment().baseUrl}`)


test('Create an item', async t => {

    const boardName = `Board ${randomString()}`
    const itemTitle = `Title ${randomString()}`

    await createNewBoard(boardName)
    await createNewItem(itemTitle)

    await t.expect(await item.itemExists(itemTitle)).eql(true)

})

test('Create an item with a task', async t => {

    const taskName = `Task ${randomString()}`
    const boardName = `Board ${randomString()}`
    const itemTitle = `Title ${randomString()}`

    await createNewBoard(boardName)
    await createNewItemWithTask(itemTitle, taskName)

    await t.expect(await item.itemExists(itemTitle)).eql(true)

})

test('Create an item and remove the task during creation', async t => {

    const boardName = `Board ${randomString()}`
    const itemTitle = `Title ${randomString()}`

    await createNewBoard(boardName)
    await board.clickNewItem()
    await item.typeItemTitle(itemTitle)
    await item.clickAddTask()
    await item.clickAddTask()
    await item.clickAddTask()
    await item.clickRemoveTaskByIndex(2)
    await item.clickRemoveTaskByIndex(1)
    await item.clickRemoveTaskByIndex(0)
    await item.clickAddItem()

    await t.expect(await item.itemExists(itemTitle)).eql(true)

})

test('Create an item with multiple tasks', async t => {

    const taskName1 = `Task ${randomString()}`
    const taskName2 = `Task ${randomString()}`
    const taskName3 = `Task ${randomString()}`
    const boardName = `Board ${randomString()}`
    const itemTitle = `Title ${randomString()}`

    await createNewBoard(boardName)

    await board.clickNewItem()

    await item.typeItemTitle(itemTitle)
    await item.clickAddTask()
    await item.clickAddTask()
    await item.clickAddTask()
    await item.typeTaskNameAndIndex(taskName1, 0)
    await item.typeTaskNameAndIndex(taskName2, 1)
    await item.typeTaskNameAndIndex(taskName3, 2)
    await item.clickAddItem()

    await t.expect(await item.itemExists(itemTitle)).eql(true)

})

test('Delete an item', async t => {

    const boardName = `Board ${randomString()}`
    const itemTitle = `Title ${randomString()}`

    await createNewBoard(boardName)
    await createNewItem(itemTitle)

    await t.expect(await item.itemExists(itemTitle)).eql(true)
    await item.clickDeleteItemByTitle(itemTitle)
    await t.expect(await item.itemExists(itemTitle)).eql(false)

})


test('Create an item on a board and check if that item is not on the other board', async t => {

    const boardName1 = `Board ${randomString()}`
    const boardName2 = `Board ${randomString()}`
    const itemTitle = `Title ${randomString()}`

    await createNewBoard(boardName1)
    await createNewBoard(boardName2)
    await createNewItem(itemTitle)

    await board.switchToBoard(boardName1)

    await t.expect(await item.itemExists(itemTitle)).eql(false)

})

test('Edit title', async t => {

    const boardName = `Board ${randomString()}`
    const itemTitle = `Title ${randomString()}`
    const newItemTitle = `Title ${randomString()}`

    await createNewBoard(boardName)
    await createNewItem(itemTitle)

    await t.expect(await item.itemExists(itemTitle)).eql(true)

    await item.clickEditItemByTitle(itemTitle)
    await item.typeItemTitle(newItemTitle)
    await item.clickSaveItem()

    await t.expect(await item.itemExists(itemTitle)).eql(false)
    await t.expect(await item.itemExists(newItemTitle)).eql(true)

})
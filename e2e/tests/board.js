import board from './pages/boardPage';

import {
    randomString,
    createNewBoard,
    environment
} from './helpers/helpers';



fixture`Board Test Suite`
    .page(`${environment().baseUrl}`)


test('Create a board', async t => {

    const boardName = `Board ${randomString()}`

    await createNewBoard(boardName)

    await t.expect(await board.getNavBoardName()).eql(boardName)
    await t.expect(await board.checkIfBoardExistsByName(boardName)).eql(true)

})

test('Create a board from an existent board', async t => {

    const boardName1 = `Board ${randomString()}`

    await createNewBoard(boardName1)
    await t.expect(await board.getNavBoardName()).eql(boardName1)

    const boardName2 = `Board ${randomString()}`

    await createNewBoard(boardName2)
    await t.expect(await board.getNavBoardName()).eql(boardName2)

    await t.expect(await board.checkIfBoardExistsByName(boardName1)).eql(true)
    await t.expect(await board.checkIfBoardExistsByName(boardName2)).eql(true)

})

test('Delete a board from an existent board', async t => {

    const boardName1 = `Board ${randomString()}`
    await createNewBoard(boardName1)
    await t.expect(await board.getNavBoardName()).eql(boardName1)

    const boardName2 = `Board ${randomString()}`
    await createNewBoard(boardName2)
    await t.expect(await board.getNavBoardName()).eql(boardName2)

    await t.expect(await board.checkIfBoardExistsByName(boardName1)).eql(true)
    await t.expect(await board.checkIfBoardExistsByName(boardName2)).eql(true)

    await board.clickDeleteboard()

    await t.expect(await board.checkIfBoardExistsByName(boardName1)).eql(true)
    await t.expect(await board.checkIfBoardExistsByName(boardName2)).eql(false)

})

test('Create a board without name', async t => {

    await board.clickNewBoard()
    await board.clickAddboard()

    await t.expect(await board.getNavBoardName()).eql("New Board")
    await t.expect(board.btnAddBoard.withAttribute("disabled").exists).eql(true)

})

test('Delete a board', async t => {

    const boardName = `Board ${randomString()}`

    await createNewBoard(boardName)
    await board.clickDeleteboard()

    await t.expect(await board.getNavBoardName()).eql("New Board")
    await t.expect(board.btnAddBoard.exists).eql(false)
    await t.expect(board.btnDeleteBoard.exists).eql(false)
    await t.expect(await board.checkIfBoardExistsByName(boardName)).eql(false)

})
import { t, Selector as $ } from 'testcafe';

class BoardPage {

    constructor() {
        this.btnAddBoard = $("button[type=submit]")
        this.txtBoardName = $("input[id=boardName]")
        this.navBoardName = $("a[class=navbar-brand]")
        this.btnNewBoard = $("a").withText("New Board")
        this.btnNewItem = $("button").withText("New Item")
        this.btnDeleteBoard = $("button").withText("Delete Current Board")
    }

    async clickNewBoard() {
        await t.click(this.btnNewBoard)
    }

    async typeBoardName(boardName) {
        await t.typeText(this.txtBoardName, boardName)
    }

    async clickAddboard() {
        await t.click(this.btnAddBoard)
    }

    async clickDeleteboard() {
        await t.click(this.btnDeleteBoard)
    }

    async getNavBoardName() {
        return await $(this.navBoardName).innerText
    }

    async clickNewItem() {
        await t.click(this.btnNewItem)
    }

    async switchToBoard(boardName) {
        await t.click($("div[class=navbar-header] > a"))
            .click($("a[id=boardTitle]")
                .withText(boardName)
            )
    }

    async checkIfBoardExistsByName(boardName) {
        return await $("a[id=boardTitle]").withText(boardName).exists
    }

}

export default new BoardPage();
import { t, Selector as $ } from 'testcafe';

class ItemPage {

    constructor() {
        this.txtTaskName = $("input[id=task]")
        this.txtItemTitle = $("input[id=title]")
        this.btnEditItem = $("button").withText("Edit")
        this.btnSaveItem = $("button").withText("Save")
        this.btnAddTask = $("button").withText("Add Task")
        this.item = $("div[class='panel panel-default col-xs-3'] h3")
        this.btnAddItem = $("button[type=submit]").withText("Add Item")
    }

    async typeItemTitle(itemTitle) {
        await t.typeText(this.txtItemTitle, itemTitle, { replace: true })
    }

    async clickAddItem() {
        await t.click(this.btnAddItem)
    }

    async clickSaveItem() {
        await t.click(this.btnSaveItem)
    }

    async itemExists(itemTitle) {
        return await this.item.withText(itemTitle).exists
    }

    async clickAddTask() {
        await t.click(this.btnAddTask)
    }


    async clickEditItem() {
        await t.click(this.btnEditItem)
    }

    async clickRemoveTaskByIndex(index) { //zero-based
        await t.click($("div[formarrayname=tasks] div[class='col-xs-2'] button[class*='btn-danger']")
            .withText("X")
            .nth(index)
        )
    }

    async clickEditItemByTitle(itemTitle) {
        await t.click($("div[class='panel panel-default col-xs-3'] h3")
            .withText(itemTitle)
            .parent("div[class=row]")
            .find("button")
            .withText("Edit")
        )
    }

    async clickDeleteItemByTitle(itemTitle) {
        await t.click($("div[class='panel panel-default col-xs-3'] h3")
            .withText(itemTitle)
            .parent("div[class=row]")
            .find("button")
            .withText("Delete")
        )
    }

    async typeTaskName(taskName) {
        await t.typeText(this.txtTaskName, taskName)
    }

    async typeTaskNameAndIndex(taskName, index) { //zero-based
        await t.typeText($("div[formarrayname = tasks] div[class= 'col-xs-8'] input[id = task]")
            .nth(index), taskName)
    }

}

export default new ItemPage();
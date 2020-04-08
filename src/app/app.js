import { LitElement, html, css } from 'lit-element';
import './components/todo-list'
import Task from './models/Task'
import './components/list-adder'
import uuid from 'uuid/v4'

class AppComponent extends LitElement {

    static get styles() {
        return css`
        
        :host {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px,1fr));
            grid-gap: 10px;
            padding: 10px;
        }
        
        `
    }

    render() {
        return html`
            ${this.tasksLists.map(list => html`
                <todo-list
                    @updateTitle="${this.listTitleUpdateFactory(list.id)}"
                    @listDelete="${this.listDeleteFactory(list.id)}"
                    @updateList="${this.listUpdateFactory(list.id)}"
                    .title="${list.title}"
                    .tasks="${list.tasks}"
                >
                </todo-list>
            `)}
            <list-adder
                @listAdd="${this.listAdd}"
            >
            </list-adder>
        `
    }

    constructor() {
        super()
        this.tasksLists = JSON.parse(localStorage.getItem("tasksLists")) || []
    }

    updateState() {
        localStorage.setItem("tasksLists", JSON.stringify(this.tasksLists))
    }

    updated() {
        this.updateState()
    }

    listAdd() {
        this.tasksLists.push({id: uuid(), title:"Your Title", tasks: []})
        this.requestUpdate()
    }

    listDeleteFactory(id) {
        return function() {
            const index = this.tasksLists.findIndex(list => list.id === id)
            this.tasksLists.splice(index,1)
            this.requestUpdate()
        }
    }

    listUpdateFactory(id) {
        return function(event) {
            const index = this.tasksLists.findIndex(list => list.id === id)
            this.tasksLists[index].tasks = event.detail.list
            console.log(this.tasksLists[index]);
            this.updateState()
        }
    }

    listTitleUpdateFactory(id) {
        return function(event) {
            const index = this.tasksLists.findIndex(list => list.id === id)
            this.tasksLists[index].title = event.detail.value
            this.updateState()
        }
    }
}

customElements.define('app-component', AppComponent);
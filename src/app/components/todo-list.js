import { LitElement, html, css } from 'lit-element';
import './todo-entry'
import './task-adder'
import './icons/icon-cross'
import Task from '../models/Task'

class TodoList extends LitElement {
    static get properties() {
        return {
            tasks: Array,
            title: String,
        }
    }

    static get styles() {
        return css`
            ul {
                padding: 0;
            }

            .list {
                display: block;
                box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
                padding: 10px;
                position: relative;
                /* height: calc(100% - 20px) */
            }

            .header {
                text-align: center;
            }

            a {
                padding: .5em 1em;
                border: 1px solid var(--primary);
                border-radius: 3px;
                margin: 10px;
                color: white;
                background: var(--primary);
                text-decoration: none;
            }

            i-cross {
                position: absolute;
                right: 10px;
                top: 17px;
                cursor: pointer;
            }

            input {
                border: none;
                padding: 0.6em 0;
                text-align:center;
                outline: none;
                display: block;
                -webkit-appearance: none;
                width: calc(100% - 20px);
                font-weight: bold;
                font-size: large;
            }

            input:focus {
                font-weight: normal
            }

        `
    }

    render() {
        return html`
            <div class="list">
                <i-cross @click="${this.deleteList}"></i-cross>
                <div class="header">
                    <input
                        value="${this.title}"
                        @keypress="${this.checkTitle}"
                        @blur="${this.updateTitle}"
                    >
                    <task-adder
                        @taskAdd="${this.addTask}"
                    ></task-adder>
                </div>
                <ul>
                    ${this.tasks.map(task => html`
                        <todo-entry
                            @updateTaskState="${this.toggleListenerFactory(task.id)}"
                            @deleteTask="${this.deleteListenerFactory(task.id)}"
                            @updateValue="${this.updateValueListenerFactory(task.id)}"
                            .done="${task.done}"
                            .value="${task.value}"
                        >
                        </todo-entry>`)}
                </ul>
            </div>
        `;
    }

    constructor() {
        super()
        this.tasks = []
        this.editingTitle = false;
    }

    editTitle() {
        this.editingTitle = true;
        this.requestUpdate()
    }

    updateParentList() {
        this.dispatchEvent(new CustomEvent("updateList", {detail:{list:this.tasks}}))
    }

    updateTitle(event) {
        this.dispatchEvent(new CustomEvent("updateTitle", {detail:{value:event.target.value}}))
        this.requestUpdate()
    }

    checkTitle(event) {
        if(event.keyCode === 13) {
            event.preventDefault()
            event.target.blur()
        } else if(event.target.value.length == 30) {
            event.preventDefault()
        }
    }

    toggleListenerFactory(id) {
        return function(event) {
            const index = this.tasks.findIndex(task => task.id === id)
            this.tasks[index].done = event.detail.state
            this.updateParentList()
        }
    }
    
    deleteListenerFactory(id) {
        return function(event) {
            const index = this.tasks.findIndex(task => task.id === id)
            this.tasks.splice(index,1)
            this.requestUpdate()
            this.updateParentList()
        }
    }

    updateValueListenerFactory(id) {
        return function(event) {
            const index = this.tasks.findIndex(task => task.id === id)
            this.tasks[index].value = event.detail.value
            this.requestUpdate()
            this.updateParentList()
            console.log(this.tasks)
        }
    }

    addTask(event) {
        const task = new Task(event.detail.value, false)
        this.tasks.push(task)
        this.updateParentList()
        this.requestUpdate()
    }

    deleteList() {
        this.dispatchEvent(new CustomEvent("listDelete"))
    }
}

customElements.define('todo-list', TodoList);
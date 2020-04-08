import { LitElement, html, css } from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map.js';
import './icons/icon-done'
import './icons/icon-todo'
import './icons/icon-delete'

class TodoEntry extends LitElement {
    static get properties() {
        return {
            value: String,
            done: Boolean,
        }
    }

    static get styles() {
        return css`
            li {
                list-style-type: none;
                border: 1px solid gray;
                border-top: initial;
                margin: 0;
                padding: 10px;
                position: relative;
            }

            :host {
                cursor: pointer;
            }

            :host(:first-child) li {
                border-top: 1px solid gray;
            }

            i-delete {
                position: absolute;
                right: 10px;
                top: 1.15em;
            }

            li > input {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 40px;
                border: none;
                padding: 0.6em 0;
                outline: none;
                display: block;
                -webkit-appearance: none;
                width: calc(100% - 85px)
            }

            li > input:focus {
                border-bottom: 1px solid black
            }

        `
    }

    render() {
        return html`
            <li>
                ${this.done
                    ? html`<i-done @click="${this.toggle}"></i-done>`
                    : html`<i-todo @click="${this.toggle}"></i-todo>`
                }
                <input
                    type="text"
                    value="${this.value}"
                    spellcheck="false"
                    @keypress="${this.checkValue}"
                    @blur="${this.updateValue}"
                >
                <i-delete @click="${this.delete}"></i-delete>
            </li>
        `;
    }

    toggle() {
        this.done = !this.done
        this.dispatchEvent(new CustomEvent("updateTaskState", {detail:{state:this.done}}))
    }

    delete() {
        this.dispatchEvent(new CustomEvent("deleteTask"))
    }

    updateValue(event) {
        this.dispatchEvent(new CustomEvent("updateValue", {detail:{value:event.target.value}}))
        this.requestUpdate()
    }

    checkValue(event) {
        if(event.keyCode === 13) {
            event.preventDefault()
            event.target.blur()
        } else if(event.target.value.length == 30) {
            event.preventDefault()
        }
    }

    constructor() {
        super()
    }
}

customElements.define('todo-entry', TodoEntry);
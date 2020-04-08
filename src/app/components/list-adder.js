import { LitElement, html, css } from 'lit-element';
import './todo-entry'
import './task-adder'
import Task from '../models/Task'

class ListAdder extends LitElement {
    static get properties() {
        return {
            tasks: Array,
            converter: {

            }
        }
    }

    static get styles() {
        return css`
            .adder {
                display: block;
                box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
                text-align: center;
                padding-top: 20px;
                padding-bottom: 13px;
                cursor: pointer;
            }
        `
    }

    render() {
        return html`
            <div @click="${this.add}" class="adder">
                <svg style="width:3em;height:3em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                </svg>
            </div>
        `;
    }

    add() {
        this.dispatchEvent(new CustomEvent("listAdd"))
    }

}

customElements.define('list-adder', ListAdder);
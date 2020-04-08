import { LitElement, html, css } from 'lit-element';
import './icons/icon-done'
import './icons/icon-todo'
import './icons/icon-add'

class TaskAdder extends LitElement {

    static get styles() {
        return css`

            button {
                display: inline-block;
                padding: 10px 10px;
                font-size: 20px;
                border-radius: 0;
                -webkit-appearance: none;
                border: 1px solid transparent;
                border-radius: 0 5px 5px 0;
                background-color: #007bff;
                color: white;
            }

            input {
                display: inline-block;
                padding: 10px 15px;
                font-size: 20px;
                border-radius: 0;
                -webkit-appearance: none;
                border: 1px solid lightgray;
                width: 70%;
                border-radius: 5px 0 0 5px;
            }

        `
    }

    render() {
        return html`
            <div>
                <input type="text" @keypress="${this.checkKey}"><button @click="${this.add}">
                <i-add></i-add>
                </button>
            </div>
        `;
    }

    checkKey(event) {
        if(event.keyCode == 13) {
            this.add()
            event.target.value = "";
            event.preventDefault()
        }
        console.log(event)
    }

    add() {
        this.dispatchEvent(new CustomEvent("taskAdd", {detail:{value:this.shadowRoot.querySelector('input').value}}))
    }
}

customElements.define('task-adder', TaskAdder);
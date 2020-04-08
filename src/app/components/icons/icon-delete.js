import { LitElement, html, css } from 'lit-element';

class IconDelete extends LitElement {
    static get styles() {
        return css`
            :host {
                position: relative;
                margin: 0.1em 0.7em;
            }
        `
    }

    render() {
        return html`
            <svg style="width:1.5em;height:1.5em;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
        `;
    }
}

customElements.define('i-delete', IconDelete);
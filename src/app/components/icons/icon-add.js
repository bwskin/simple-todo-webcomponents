import { LitElement, html, css } from 'lit-element';

class IconAdd extends LitElement {
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
                <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
        `;
    }
}

customElements.define('i-add', IconAdd);
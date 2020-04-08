import { LitElement, html, css } from 'lit-element';

class IconCross extends LitElement {
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
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
        `;
    }
}

customElements.define('i-cross', IconCross);
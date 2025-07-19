import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
  it('renders header and description', async () => {
      const el = await fixture(html`<loan-success></loan-success>`);
      expect(el.shadowRoot.querySelector('h2')).to.exist;
      expect(el.shadowRoot.querySelector('p')).to.exist;
      expect(el.shadowRoot.querySelector('lion-button')).to.exist;
    });
    it('is registered as a custom element', () => {
      expect(customElements.get('loan-success')).to.exist;
    });
});

describe('error screen', () => {
  it('renders header and description', async () => {
  const el = await fixture(html`<loan-error></loan-error>`);
  expect(el.shadowRoot.querySelector('h2')).to.exist;
  expect(el.shadowRoot.querySelector('p')).to.exist;
  expect(el.shadowRoot.querySelector('lion-button')).to.exist;
});

it('has correct styles applied', async () => {
  const el = await fixture(html`<loan-error></loan-error>`);
  const style = getComputedStyle(el);
  expect(style.textAlign).to.equal('center');
  expect(style.fontFamily).to.include('monospace');
});
it('is registered as a custom element', () => {
  expect(customElements.get('loan-error')).to.exist;
});
});

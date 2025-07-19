import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon'
import '../loan-application.js';
import '../src/dashboard/Dashboard-menu.js';

describe('LoanApplication', () => {
  it('renders the image and title passed as properties', async () => {
    const el = await fixture(html`
      <dashboard-menu imageURL="test.jpg" title="Home Loan"></dashboard-menu>
    `);
    const img = el.shadowRoot.querySelector('img');
    const title = el.shadowRoot.querySelector('h4 b');
    expect(img.src).to.include('test.jpg');
    expect(title.textContent).to.equal('Home Loan');
  });

  it('sets type in localStorage and navigates to details when button is clicked', async () => {
    const el = await fixture(html`
      <dashboard-menu imageURL="test.jpg" title="Car Loan"></dashboard-menu>
    `);

    const routerGoStub = sinon.stub();
    el.navigateToDetails = routerGoStub;
    const setItemStub = sinon.stub(window.localStorage, 'setItem');
    const button = el.shadowRoot.querySelector('button');
    button.click();
    expect(setItemStub).to.have.been.calledWith('type', 'Car Loan');
    expect(routerGoStub).to.have.been.calledOnce;
    setItemStub.restore();
  });

  it('has expected default styles applied', async () => {
    const el = await fixture(html`
      <dashboard-menu imageURL="img.jpg" title="Personal Loan"></dashboard-menu>
    `);
    expect(el.constructor.styles.cssText).to.include('background-color: #ccc');
    expect(el.constructor.styles.cssText).to.include('box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)');
  });
});

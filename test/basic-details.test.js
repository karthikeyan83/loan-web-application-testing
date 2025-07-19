import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {
  let element;
  beforeEach(async () => {
    localStorage.setItem('type', 'Personal Loan');
    element = await fixture(html`<basic-details></basic-details>`);
  });

  it('renders loan type, amount, and period fields', () => {
    expect(element.shadowRoot.querySelector('.type')).to.exist;
    expect(element.shadowRoot.querySelector('.amount')).to.exist;
    expect(element.shadowRoot.querySelector('.period')).to.exist;
  });

  it('sets default values for amount and period', () => {
    expect(element.amount).to.equal(10000);
    expect(element.range).to.equal(2);
    expect(element.type).to.equal('Personal Loan');
  });

  it('shows validation error if amount is less than 10000', async () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '9000';
    await element._captureDetails();
    expect(amountInput.classList.contains('e-handle')).to.be.true;
  });

  it('shows validation error if amount is greater than 10000000', async () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '10000001';
    await element._captureDetails();
    expect(amountInput.classList.contains('e-handle')).to.be.false;
  });

  it('displays amount in words as user types', async () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '50000';
    amountInput.dispatchEvent(new Event('keyup'));
    const wordsDiv = element.shadowRoot.querySelector('#word');
    expect(wordsDiv.innerHTML).to.contain('fifty thousand');
  });

});

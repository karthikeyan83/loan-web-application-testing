import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/LoanEMIDetails/LoanEMIDetails.js';

describe('Loan EMI details', () => {
  beforeEach(() => {
    // Mock localStorage data for the component
    const mockEMI = {
      interestRate: 8.5,
      monthlyEMI: 1200,
      principal: 100000,
      interest: 20000,
      totalAmount: 120000,
    };
    localStorage.setItem('emi', JSON.stringify(mockEMI));
  });

  it('should load EMI details from localStorage and render them', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    await el.updateComplete;
    expect(el._data.interestRate).to.equal(8.5);
    expect(el._data.monthlyEMI).to.equal(1200);
    expect(el._data.principal).to.equal(100000);
    expect(el._data.interest).to.equal(20000);
    expect(el._data.totalAmount).to.equal(120000
    const emiDetails = el.shadowRoot.querySelector('.emi-details');
    expect(emiDetails).to.exist;
    expect(emiDetails.textContent).to.include('8.5');
    expect(emiDetails.textContent).to.include('1200');
    expect(emiDetails.textContent).to.include('100000');
    expect(emiDetails.textContent).to.include('20000');
    expect(emiDetails.textContent).to.include('120000');
  });

  it('should navigate to /details when Cancel button is clicked', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const routerGoStub = sinon.stub(el, '_toBasicDetails').callsFake(() => {});
    const cancelBtn = el.shadowRoot.querySelector('.cancel-btn');
    cancelBtn.click();
    expect(routerGoStub.calledOnce).to.be.false;
  });

  it('should navigate to /customer when Continue button is clicked', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const routerGoStub = sinon.stub(el, '_toCustomer').callsFake(() => {});
    const continueBtn = el.shadowRoot.querySelector('.continue-btn');
    continueBtn.click();
    expect(routerGoStub.calledOnce).to.be.false;
  });

  it('should have correct styling applied', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const host = el.shadowRoot.host;
    expect(getComputedStyle(host).display).to.equal('block');
  });
});

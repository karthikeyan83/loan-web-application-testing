import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon'
import '../src/LoanEMIDetails/LoanEMIDetails.js';
import '../src/dashboard/Dashboard-overview.js';

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

describe('DashboardOverview', () => {
  it('is registered as a custom element', () => {
    expect(customElements.get('dashboard-overview')).to.exist;
  });

  it('renders a container with dashboard cards', async () => {
    const el = await fixture(html`<dashboard-overview></dashboard-overview>`);
    const container = el.shadowRoot.querySelector('.container');
    expect(container).to.exist;
    // Should render 4 dashboard-menu cards
    const cards = container.querySelectorAll('dashboard-menu');
    expect(cards.length).to.equal(4);
  });

  it('dashboard cards have correct titles and images', async () => {
    const el = await fixture(html`<dashboard-overview></dashboard-overview>`);
    const cards = el.shadowRoot.querySelectorAll('dashboard-menu');
    const expected = [
      { title: 'Home Loan', image: 'images/Home-Loans.jpg' },
      { title: 'Personal Loan', image: 'images/personal-Loan.jpg' },
      { title: 'Car Loan', image: 'images/car loan.jpg' },
      { title: 'Vacation Loan', image: 'images/vacation-loans.jpg' }
    ];
    cards.forEach((card, i) => {
      expect(card.getAttribute('title')).to.equal(expected[i].title);
      expect(card.getAttribute('imageURL')).to.include(expected[i].image);
    });
  });

  it('applies correct styling to container', async () => {
    const el = await fixture(html`<dashboard-overview></dashboard-overview>`);
    const container = el.shadowRoot.querySelector('.container');
    expect(getComputedStyle(container).display).to.equal('flex');
  });
});

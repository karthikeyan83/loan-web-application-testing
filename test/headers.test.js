import { html, fixture, expect } from '@open-wc/testing';
import '../src/header/Header.js'; // Import your component

describe('Loan Header', () => {
  it('Renders EN and NL Langauge buttons on the header', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    const header = el.shadowRoot.querySelector('header');
    expect(header).to.exist;
    const heading = header.querySelector('p');
    expect(heading).to.exist;
    expect(heading.textContent).to.not.be.empty;
    const enBtn = el.shadowRoot.getElementById('en-GB');
    const nlBtn = el.shadowRoot.getElementById('nl-NL');
    expect(enBtn).to.exist;
    expect(nlBtn).to.exist;
    expect(enBtn.textContent.trim()).to.equal('EN');
    expect(nlBtn.textContent.trim()).to.equal('NL');
  });

  it('Change language to english when EN is clicked', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    const enBtn = el.shadowRoot.getElementById('en-GB');
    const nlBtn = el.shadowRoot.getElementById('nl-NL');
    nlBtn.click();
    enBtn.classList.add('btn-cursor');
    nlBtn.classList.remove('btn-cursor');
    enBtn.click();
    expect(enBtn.classList.contains('bg-btn-color')).to.be.true;
    expect(enBtn.classList.contains('btn-cursor')).to.be.false;
    expect(nlBtn.classList.contains('btn-cursor')).to.be.true;
    expect(nlBtn.classList.contains('bg-btn-color')).to.be.false;
  });

  it('changes language to Netherlands when NL is clicked', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    const enBtn = el.shadowRoot.getElementById('en-GB');
    const nlBtn = el.shadowRoot.getElementById('nl-NL');
    nlBtn.click();
    expect(nlBtn.classList.contains('bg-btn-color')).to.be.true;
    expect(nlBtn.classList.contains('btn-cursor')).to.be.false;
    expect(enBtn.classList.contains('btn-cursor')).to.be.true;
    expect(enBtn.classList.contains('bg-btn-color')).to.be.false;
    const paragraphs = el.shadowRoot.querySelector('header').querySelector('p');
    expect(paragraphs.textContent.contains('Apply Loan')).to.be.true;

  });

  it('does not change locale if button is not in btn-cursor state', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    const enBtn = el.shadowRoot.getElementById('en-GB');
    enBtn.classList.remove('btn-cursor');
    enBtn.click();
    expect(enBtn.classList.contains('bg-btn-color')).to.be.true;
  });
});

import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/Customer/Customer-details.js';

describe('customer details', () => {

      it('Validation for First firstname', async () => {
         const el = await fixture(html`<customer-details></customer-details>`);
         const firstNameInput = el.shadowRoot.querySelector('[name="first_name"]');
         firstNameInput.modelValue = '';
         await el.updateComplete;
         expect(firstNameInput.hasFeedbackFor.includes('error')).to.be.true;
         firstNameInput.modelValue = 'John3';
         await el.updateComplete;
         expect(firstNameInput.hasFeedbackFor.includes('error')).to.be.true;
         firstNameInput.modelValue = 'John Doe';
         await el.updateComplete;
         expect(firstNameInput.hasFeedbackFor.length).to.equal(0);
       });

       it('Validation for Last Name', async () => {
         const el = await fixture(html`<customer-details></customer-details>`);
         const lastNameInput = el.shadowRoot.querySelector('[name="last_name"]');
         lastNameInput.modelValue = '';
         await el.updateComplete;
         expect(lastNameInput.hasFeedbackFor.includes('error')).to.be.true;
         lastNameInput.modelValue = 'John3';
         await el.updateComplete;
         expect(lastNameInput.hasFeedbackFor.includes('error')).to.be.true;
         lastNameInput.modelValue = 'John Doe';
         await el.updateComplete;
         expect(lastNameInput.hasFeedbackFor.length).to.equal(0);
       });

       it('Validation for Date of Birth', async () => {
         const el = await fixture(html`<customer-details></customer-details>`);
         const dateofBirth = el.shadowRoot.querySelector('[name="dateof_birth"]');
           dateofBirth.modelValue = '12/09/1990';
           expect(/^\d{2}\/\d{2}\/\d{4}$/.test(dateofBirth.modelValue)).to.be.true;
           dateofBirth.modelValue = '12-09-1990';
           expect(/^\d{2}\/\d{2}\/\d{4}$/.test(dateofBirth.modelValue)).to.be.false;
           dateofBirth.modelValue = '12/9/1990';
           expect(/^\d{2}\/\d{2}\/\d{4}$/.test(dateofBirth.modelValue)).to.be.false;
           dateofBirth.modelValue = '2/09/1990';
           expect(/^\d{2}\/\d{2}\/\d{4}$/.test(dateofBirth.modelValue)).to.be.false;

      });

      it('validate email', async () => {
        const el = await fixture(html`<customer-details></customer-details>`);
        const emailInput = el.shadowRoot.querySelector('[name="email"]');
        emailInput.modelValue = 'test.user@example.com';
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.modelValue)).to.be.true;
        emailInput.modelValue = 'test.userexample.com';
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.modelValue)).to.be.false;
        emailInput.modelValue = 'test.user@.com';
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.modelValue)).to.be.false;
        emailInput.modelValue = 'test.user@domain';
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.modelValue)).to.be.false;
        emailInput.modelValue = 'test.user@domain.';
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.modelValue)).to.be.false;
      });

      it('validate mobile number as 10 digits', async () => {
        const el = await fixture(html`<customer-details></customer-details>`);
        const mobileInput = el.shadowRoot.querySelector('[name="mobile_number"]');
        mobileInput.modelValue = '9876543210';
        expect(/^\d{10}$/.test(mobileInput.modelValue)).to.be.true;
        mobileInput.modelValue = '987654321';
        expect(/^\d{10}$/.test(mobileInput.modelValue)).to.be.false;
        mobileInput.modelValue = '09876543210';
        expect(/^\d{10}$/.test(mobileInput.modelValue)).to.be.false;
        mobileInput.modelValue = '98765-43210';
        expect(/^\d{10}$/.test(mobileInput.modelValue)).to.be.false;
      });

      it('should validate monthly salary as only numbers', async () => {
          const el = await fixture(html`<customer-details></customer-details>`);
          const salaryInput = el.shadowRoot.querySelector('[name="monthly_salary"]');
          salaryInput.modelValue = '50000';
          expect(/^\d+$/.test(salaryInput.modelValue)).to.be.true;
          salaryInput.modelValue = 'five thousand'; // contains letters
          expect(/^\d+$/.test(salaryInput.modelValue)).to.be.false;
        });

        it('should validate previous emi amount as only numbers', async () => {
            const el = await fixture(html`<customer-details></customer-details>`);
            const salaryInput = el.shadowRoot.querySelector('[name="EMIs_amount"]');
            salaryInput.modelValue = '50000';
            expect(/^\d+$/.test(salaryInput.modelValue)).to.be.true;
            salaryInput.modelValue = 'five thousand'; // contains letters
            expect(/^\d+$/.test(salaryInput.modelValue)).to.be.false;
        });



});

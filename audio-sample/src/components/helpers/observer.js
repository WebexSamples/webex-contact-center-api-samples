import { getBalanceFromWeGift } from "../weGift/sendOrderFromWeGift.js";
import { hideLoader } from "../helpers/notifications.js";

export class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(o) {
    this.observers.push(o);
  }

  notifyObservers() {
    for (const o of this.observers) {
      o.update(this);
    }
  }
}

export class ConsoleObserver {
  constructor() {}
  async update() {
    console.log(`NIKOOO ==> The remaining balance is  ${await getBalanceFromWeGift()} `);
  }
}

export class BalanceObserver {
  constructor(qs, elementId) {
    this.element = qs.querySelector(elementId);
  }

  async update() {
    // this.element.textContent = await getBalanceFromWeGift();
    hideLoader(this.element, "spinner");
  }
}

const EstimatorModule = (() => {
  function calculate() {
    const eventType = document.getElementById('calcEventType').value;
    const guests = parseInt(document.getElementById('guestCount').value);
    const rates = StorageModule.getSettings().estimatorRates;
    const baseRate = rates.perGuest[eventType];

    let multiplier = 0;
    if (document.getElementById('srvDecor').checked) multiplier += rates.fixedCost.decor;
    if (document.getElementById('srvCatering').checked) multiplier += guests * baseRate;
    if (document.getElementById('srvPhoto').checked) multiplier += rates.fixedCost.photo;
    if (document.getElementById('srvDj').checked) multiplier += rates.fixedCost.dj;
    if (document.getElementById('srvCoordination').checked) multiplier += rates.fixedCost.coordination;

    const min = Math.round(multiplier);
    const max = Math.round(multiplier * (1 + rates.highRangePercent / 100));
    const formatted = `₹ ${min.toLocaleString('en-IN')} - ₹ ${max.toLocaleString('en-IN')}`;

    document.getElementById('estimatedPriceDisplay').innerText = formatted;
    return formatted;
  }

  function init() {
    const slider = document.getElementById('guestCount');
    const display = document.getElementById('guestCountVal');

    slider.addEventListener('input', () => {
      display.innerText = slider.value;
      calculate();
    });

    ['calcEventType', 'srvDecor', 'srvCatering', 'srvPhoto', 'srvDj', 'srvCoordination'].forEach(id => {
      document.getElementById(id).addEventListener('change', calculate);
    });

    document.getElementById('btnSendBudget').addEventListener('click', () => {
      const settings = StorageModule.getSettings();
      const eventType = document.getElementById('calcEventType').value;
      const guests = slider.value;
      const budget = document.getElementById('estimatedPriceDisplay').innerText;
      const msg = `Hey, I checked your online Event Estimator:%0A*Event:* ${eventType}%0A*Guests:* ${guests}%0A*Estimated Budget:* ${budget}%0APlease share the best customized quote!`;
      window.open(`https://wa.me/${settings.whatsapp}?text=${msg}`, '_blank');
    });

    calculate();
  }

  return { init, refresh: calculate };
})();
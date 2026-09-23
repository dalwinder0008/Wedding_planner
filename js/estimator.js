const EstimatorModule = (() => {
  function calculate() {
    const eventType = document.getElementById('calcEventType').value;
    const guests = parseInt(document.getElementById('guestCount').value);
    
    let baseRate = 0;
    if (eventType === 'wedding') baseRate = 1200;
    else if (eventType === 'prewedding') baseRate = 800;
    else if (eventType === 'birthday') baseRate = 500;

    let multiplier = 0;
    if (document.getElementById('srvDecor').checked) multiplier += 45000;
    if (document.getElementById('srvCatering').checked) multiplier += guests * baseRate;
    if (document.getElementById('srvPhoto').checked) multiplier += 35000;
    if (document.getElementById('srvDj').checked) multiplier += 25000;
    if (document.getElementById('srvCoordination').checked) multiplier += 20000;

    const min = Math.round(multiplier);
    const max = Math.round(multiplier * 1.25);
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

  return { init };
})();
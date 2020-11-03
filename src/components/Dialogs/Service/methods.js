export function handleDispatchEvents() {
  const event = new Event('focus');

  const codeEl = document.getElementById('code');
  codeEl.dispatchEvent(event);

  const nameEl = document.getElementById('name');
  if (nameEl) nameEl.dispatchEvent(event);

  const formatedPriceEl = document.getElementById('formatedPrice');
  if (formatedPriceEl) formatedPriceEl.dispatchEvent(event);

  const descriptionEl = document.getElementById('description');
  if (descriptionEl) descriptionEl.dispatchEvent(event);
}

const tooltips = document.querySelectorAll("[data-tooltip]");

const displayTooltip = (e) => {
  const trigger = e.target;
  const tooltip = trigger.querySelector("[role=tooltip]");
  tooltip.textContent = trigger.dataset.tooltip;
  tooltip.classList.add("active");
};

const hideTooltip = (e) => {
  const tooltip = e.target.querySelector("[role=tooltip]");
  tooltip.classList.remove("active");
};

window.onload = () => {
  const DELAY = 300;
  let tooltipTimer = null;

  tooltips.forEach((trigger) => {
    let tooltip = document.createElement("div");

    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("inert", true);

    trigger.appendChild(tooltip);

    trigger.addEventListener("mouseenter", (e) => {
      clearTimeout(tooltipTimer);

      tooltipTimer = setTimeout(() => {
        displayTooltip(e);
      }, DELAY);
    });

    trigger.addEventListener("mouseleave", (e) => {
      clearTimeout(tooltipTimer);
      hideTooltip(e);
    });
  });
}
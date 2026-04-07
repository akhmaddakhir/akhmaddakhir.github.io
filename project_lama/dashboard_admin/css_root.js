function hexToRgba(hex, alpha) {
  if (!hex.startsWith("#")) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const cssRoot = (() => {
  const styles = getComputedStyle(document.documentElement);
  const vars = {};

  for (let i = 0; i < styles.length; i++) {
    const property = styles[i];

    if (property.startsWith("--")) {
      const key = property
        .slice(2)
        .replace(/-([a-z])/g, (_, c) => c.toUpperCase());

      let value = styles.getPropertyValue(property).trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      vars[key] = value;
    }
  }
  return Object.freeze(vars);
})();

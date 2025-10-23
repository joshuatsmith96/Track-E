export const generateNextId = (prefix, existingItems, key) => {
  if (!existingItems || existingItems.length === 0) return `${prefix}1`;
  const lastItem = existingItems
    .map((item) => item[key])
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10);
      const numB = parseInt(b.replace(/\D/g, ""), 10);
      return numA - numB;
    })
    .pop();

  const lastNumber = parseInt(lastItem.replace(/\D/g, ""), 10) || 0;
  return `${prefix}${lastNumber + 1}`;
};

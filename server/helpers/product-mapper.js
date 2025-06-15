export const mapProductResponse = (product) => {
  return {
    name: product.name,
    label: product.label,
    description: product.description,
    sku: product.sku,
    price: product.price,
    currency: product.currency,
    stockQuantity: product.stockQuantity,
    isActive: product.isActive,
  }
}

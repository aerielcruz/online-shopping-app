export const mapProductResponse = (product) => {
  return {
    referenceId: product.referenceId,
    name: product.name,
    label: product.label,
    description: product.description,
    price: product.price,
    currency: product.currency,
    imageUrl: product.imageUrl,
  }
}

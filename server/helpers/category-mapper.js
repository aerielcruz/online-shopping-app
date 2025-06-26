export const mapCategoryResponse = (category) => {
  return {
    referenceId: category.referenceId,
    name: category.name,
    label: category.label,
    description: category.description,
  }
}

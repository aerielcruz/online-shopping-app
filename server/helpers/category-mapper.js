export const mapCategoryResponse = (category) => {
  return {
    uuid: category.uuid,
    name: category.name,
    label: category.label,
    description: category.description,
    isActive: category.isActive,
  }
}

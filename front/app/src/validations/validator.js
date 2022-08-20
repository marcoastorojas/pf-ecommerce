export function validate(inputs) {
  let errors = {};

  if (!inputs.title) {
    errors.title = "Title is required";
  } else if (!/^[a-zA-Z0-9_ ]{6,70}$/.test(inputs.title)) {
    errors.title = "Title is invalid";
  }

  if (!inputs.model) {
    errors.model = "Model is required";
  } else if (!/^[a-zA-Z0-9_ ]{2,20}$/.test(inputs.model)) {
    errors.model = "Model is invalid";
  }

  if (!inputs.brand) {
    errors.brand = "Brand is required";
  } else if (!/^[a-zA-Z_ ]{4,14}$/.test(inputs.brand)) {
    errors.brand = "Brand is invalid";
  }

  if (!inputs.description) {
    errors.description = "Description is requires";
  } else if (!/^[a-zA-Z0-9_ ]{15,200}$/.test(inputs.description)) {
    errors.description = "Description is invalid";
  }

  if (!inputs.price) {
    errors.price = "Price is required";
  } else if (
    !/^([0-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-4][0-9][0-9][0-9])$/.test(
      inputs.price
    )
  ) {
    errors.price = "Price is invalid";
  }

  if (!inputs.images) {
    errors.images = "Images is required";
  } else if (!/\.(jpe?g|tiff?|png|webp|bmp)$/i.test(inputs.images)) {
    errors.images = "Images is format invalid";
  }

  return errors;
}

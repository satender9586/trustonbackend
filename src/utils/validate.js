const validator = require("validator");

const validateSignUpInfo = (data) => {
  const { firstName, lastName, phoneNumber, emailId, password } = data;
  const errors = [];

  // First Name
  if (!firstName || firstName.trim().length === 0) {
    errors.push({ field: "firstName", message: "First name is required!" });
  } else if (firstName.trim().length > 20) {
    errors.push({ field: "firstName", message: "First name is too long!" });
  }

  // Phone number
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    errors.push({ field: "phoneNumber", message: "Phone number is required!" });
  } else if (!/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
    errors.push({ field: "phoneNumber", message: "Invalid phone number" });
  }

  // Password
  if (!password || password.trim().length === 0) {
    errors.push({ field: "password", message: "Password is required!" });
  } else if (password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }

  // Email
  if (!emailId || emailId.trim().length === 0) {
    errors.push({ field: "emailId", message: "Email is required!" });
  } else if (!validator.isEmail(emailId)) {
    errors.push({ field: "emailId", message: "Invalid email format" });
  }

  return errors;
};

const validateLoginInfo=(data)=>{
  const{emailId, password}=data
   const errors = [];
    // Email
  if (!emailId || emailId.trim().length === 0) {
    errors.push({ field: "emailId", message: "Email is required!" });
  } else if (!validator.isEmail(emailId)) {
    errors.push({ field: "emailId", message: "Invalid email format" });
  }

  
  // Password
  if (!password || password.trim().length === 0) {
    errors.push({ field: "password", message: "Password is required!" });
  } else if (password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }
  return errors

}


const validateServiceInfo = (data) => {
  const { serviceName,slug, description,  bannerImg, iconImg, trending, status } = data;

  const errors = [];


  if (!serviceName || serviceName.trim().length === 0) {
    errors.push({ field: "serviceName", message: "Service name is required!" });
  } else if (serviceName.length > 100) {
    errors.push({ field: "serviceName", message: "Service name must be under 100 characters" });
  }


  if (!slug || slug.trim().length === 0) {
    errors.push({ field: "slug", message: "Slug is required!" });
  } else if (!/^[a-z0-9-]+$/.test(slug)) {
    errors.push({ field: "slug", message: "Slug must contain only lowercase letters, numbers, hyphens" });
  } else if (slug.length > 100) {
    errors.push({ field: "slug", message: "Slug must be under 100 characters" });
  }


  if (description && description.trim().length < 10) {
    errors.push({ field: "description", message: "Description must be at least 10 characters" });
  }


  if (bannerImg && !validator.isURL(bannerImg)) {
    errors.push({ field: "bannerImg", message: "Invalid banner image URL" });
  }


  if (iconImg && !validator.isURL(iconImg)) {
    errors.push({ field: "iconImg", message: "Invalid icon image URL" });
  }


  if (trending !== undefined && typeof trending !== "boolean") {
    errors.push({ field: "trending", message: "Trending must be true or false" });
  }

  if (status !== undefined && typeof status !== "boolean") {
    errors.push({ field: "status", message: "Status must be true or false" });
  }

  return errors;
};

const validateCategoryInfo = (data) => {
  const { serviceId, categoryName, description } = data;
  const errors = [];

  // serviceId
  if (!serviceId) {
    errors.push({ field: "serviceId", message: "serviceId is required" });
  } else if (typeof serviceId !== "number") {
    errors.push({ field: "serviceId", message: "serviceId must be a number" });
  }

  // categoryName
  if (!categoryName || categoryName.trim().length === 0) {
    errors.push({ field: "categoryName", message: "Category name is required" });
  } else if (categoryName.length > 100) {
    errors.push({ field: "categoryName", message: "Category name must be under 100 characters" });
  }

  // description
  if (description && description.length < 10) {
    errors.push({ field: "description", message: "Description must be at least 10 characters" });
  }

  return errors;
};

const validateServiceItemInfo = (data) => {
  const { categoryId, itemName, itemPrice, itemDescription, imageUrl } = data;
  const errors = [];

  // categoryId
  if (!categoryId) {
    errors.push({ field: "categoryId", message: "categoryId is required" });
  } else if (typeof categoryId !== "number") {
    errors.push({ field: "categoryId", message: "categoryId must be a number" });
  }

  // itemName
  if (!itemName || itemName.trim().length === 0) {
    errors.push({ field: "itemName", message: "Item name is required" });
  } else if (itemName.length > 100) {
    errors.push({ field: "itemName", message: "Item name must be under 100 characters" });
  }

  // itemPrice
  if (itemPrice === undefined || itemPrice === null) {
    errors.push({ field: "itemPrice", message: "Item price is required" });
  } else if (typeof itemPrice !== "number") {
    errors.push({ field: "itemPrice", message: "Item price must be a number" });
  }

  // itemDescription
  if (itemDescription && itemDescription.length < 10) {
    errors.push({ field: "itemDescription", message: "Item description must be at least 10 characters" });
  }

  // imageUrl
  if (imageUrl && !/^https?:\/\/.+\..+/.test(imageUrl)) {
    errors.push({ field: "imageUrl", message: "Invalid image URL" });
  }

  return errors;
};

const validateServiceItemFeatureInfo = (data) => {
  const { itemId, featureText } = data;
  const errors = [];

  if (!itemId || typeof itemId !== "number") {
    errors.push({ field: "itemId", message: "itemId is required and must be a number" });
  }

  if (!featureText || featureText.trim().length === 0) {
    errors.push({ field: "featureText", message: "featureText is required" });
  } else if (featureText.length > 255) {
    errors.push({ field: "featureText", message: "featureText must be under 255 characters" });
  }

  return errors;
};
const validateBookingInfo = (data) => {
  const {
    customerName,
    customerPhone,
    serviceCategoryId,
    serviceItemId,
    preferredDate,
    preferredTimeSlot,
    bookingType,
    address
  } = data;

  const errors = [];

  if (!customerName || customerName.trim().length === 0) {
    errors.push({ field: "customerName", message: "Customer name is required" });
  }

  if (!customerPhone || !/^[0-9]{10}$/.test(customerPhone)) {
    errors.push({ field: "customerPhone", message: "Invalid phone number" });
  }

  if (!serviceCategoryId) {
    errors.push({ field: "serviceCategoryId", message: "Service category is required" });
  }

  if (!serviceItemId) {
    errors.push({ field: "serviceItemId", message: "Service item is required" });
  }

  if (!preferredDate) {
    errors.push({ field: "preferredDate", message: "Preferred date is required" });
  }

  if (!bookingType || !["online", "offline"].includes(bookingType)) {
    errors.push({ field: "bookingType", message: "Invalid booking type" });
  }

  if (!address) {
    errors.push({ field: "address", message: "Address is required" });
  } else {
    const { houseNo, street, area, city, state } = address;

    if (!houseNo) errors.push({ field: "houseNo", message: "House No is required" });
    if (!street) errors.push({ field: "street", message: "Street is required" });
    if (!area) errors.push({ field: "area", message: "Area is required" });
    if (!city) errors.push({ field: "city", message: "City is required" });
    if (!state) errors.push({ field: "state", message: "State is required" });
  }

  return errors;
};



module.exports = { validateSignUpInfo ,validateLoginInfo,validateServiceInfo,validateCategoryInfo,
  validateServiceItemInfo,validateServiceItemFeatureInfo,validateBookingInfo};

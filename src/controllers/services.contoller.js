const ErrorHandler = require("../utils/errorHandler.js");
const { validateServiceInfo, validateCategoryInfo, validateServiceItemInfo, validateServiceItemFeatureInfo, validateBookingInfo } = require("../utils/validate.js")
const SuccessHandler = require("../utils/successHandler.js");
const { queryAsync } = require("../config/dbConnect.js");


const addServices = async (req, res) => {
  try {
    const {
      serviceName,
      slug,
      description,
      bannerImg,
      iconImg,
      trending,
      status
    } = req.body;


    const inputFieldErrors = validateServiceInfo(req.body);
    if (inputFieldErrors.length > 0) {
      const error = new ErrorHandler(400, "Invalid service fields!", inputFieldErrors);
      return res.status(error.status).json({
        success: false,
        message: error.message,
        data: error.data,
        error: error.errors
      });
    }

    const checkSlug = await queryAsync(
      `SELECT * FROM services WHERE slug = ?`,
      [slug]
    );

    if (checkSlug.length > 0) {
      const error = new ErrorHandler(400, "Slug already exists! Use another slug.");
      return res.status(error.status).json({
        success: false,
        message: error.message,
        error: error.errors
      });
    }

    const saveService = await queryAsync(`INSERT INTO services (serviceName, slug, description, bannerImg, iconImg, trending, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        serviceName,
        slug,
        description || null,
        bannerImg || null,
        iconImg || null,
        trending ?? false,
        status ?? true
      ]
    );

    const success = new SuccessHandler(201, "Service created successfully!", { insertedId: saveService.insertId });

    return res.status(success.status).json({
      success: true,
      message: success.message,
      data: success.data,
      error: success.errors
    });

  } catch (error) {
    const errors = new ErrorHandler(500, error.message);
    return res.status(errors.status).json({
      success: false,
      message: errors.message,
      error: errors.errors
    });
  }

};

const addServiceCategories = async (req, res) => {
  try {
    const { serviceId, categoryName, description } = req.body;

    // Validate input
    const inputErrors = validateCategoryInfo(req.body);
    if (inputErrors.length > 0) {
      const error = new ErrorHandler(400, "Invalid category data", inputErrors);
      return res.status(error.status).json({
        success: false,
        message: error.message,
        error: error.errors,
      });
    }

    // Check duplicate category for the same service
    const checkCategory = await queryAsync(
      "SELECT * FROM service_categories WHERE serviceId = ? AND categoryName = ?",
      [serviceId, categoryName]
    );

    if (checkCategory.length > 0) {
      const error = new ErrorHandler(400, "Category already exists for this service");
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    // Insert category
    const result = await queryAsync(
      "INSERT INTO service_categories (serviceId, categoryName, description) VALUES (?, ?, ?)",
      [serviceId, categoryName, description || null]
    );

    const success = new SuccessHandler(201, "Category added successfully", { categoryId: result.insertId });
    return res.status(success.status).json({
      success: true,
      message: success.message,
      data: success.data,
    });

  } catch (err) {
    const error = new ErrorHandler(500, err.message);
    return res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }
};

const addServiceItem = async (req, res) => {
  try {
    const { categoryId, itemName, itemPrice, itemDescription, imageUrl } = req.body;

    // Validate input
    const inputErrors = validateServiceItemInfo(req.body);
    if (inputErrors.length > 0) {
      const error = new ErrorHandler(400, "Invalid service item data", inputErrors);
      return res.status(error.status).json({
        success: false,
        message: error.message,
        error: error.errors,
      });
    }

    // Check duplicate item in same category
    const checkItem = await queryAsync(
      "SELECT * FROM service_items WHERE categoryId = ? AND itemName = ?",
      [categoryId, itemName]
    );

    if (checkItem.length > 0) {
      const error = new ErrorHandler(400, "Service item already exists in this category");
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    // Insert item
    const result = await queryAsync(
      "INSERT INTO service_items (categoryId, itemName, price, shortDesc, image) VALUES (?, ?, ?, ?, ?)",
      [categoryId, itemName, itemPrice, itemDescription || null, imageUrl || null]
    );

    const success = new SuccessHandler(201, "Service item added successfully", { itemId: result.insertId });
    return res.status(success.status).json({
      success: true,
      message: success.message,
      data: success.data,
    });

  } catch (err) {
    const error = new ErrorHandler(500, err.message);
    return res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }
};

const addServiceItemFeaturese = async (req, res) => {
  try {
    const { itemId, featureText } = req.body;

    // Validate input
    const inputErrors = validateServiceItemFeatureInfo({ itemId, featureText });
    if (inputErrors.length > 0) {
      const error = new ErrorHandler(400, "Invalid feature data", inputErrors);
      return res.status(error.status).json({
        success: false,
        message: error.message,
        error: error.errors,
      });
    }


    const result = await queryAsync(
      "INSERT INTO service_item_features (itemId, featureText) VALUES (?, ?)",
      [itemId, featureText]
    );

    const success = new SuccessHandler(201, "Feature added successfully", { featureId: result.insertId });
    return res.status(success.status).json({
      success: true,
      message: success.message,
      data: success.data,
    });

  } catch (err) {
    const error = new ErrorHandler(500, err.message);
    return res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }
};


const getServices = async (req, res) => {
  try {

    const services = await queryAsync("SELECT * FROM services WHERE status = TRUE");

    const serviceData = [];
    for (let service of services) {
      const categories = await queryAsync(
        "SELECT * FROM service_categories WHERE serviceId = ?",
        [service.serviceId]
      );


      const categoriesData = [];
      for (let category of categories) {
        const items = await queryAsync(
          "SELECT * FROM service_items WHERE categoryId = ?",
          [category.categoryId]
        );


        const itemsData = [];
        for (let item of items) {
          const features = await queryAsync(
            "SELECT * FROM service_item_features WHERE itemId = ?",
            [item.itemId]
          );

          itemsData.push({
            itemId: item.itemId,
            itemName: item.itemName,
            price: item.price,
            description: item.description,
            image: item.image,
            features: features.map(f => ({
              featureId: f.featureId,
              featureText: f.featureText
            }))
          });
        }

        categoriesData.push({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          description: category.description,
          items: itemsData
        });
      }

      serviceData.push({
        serviceId: service.serviceId,
        serviceName: service.serviceName,
        slug: service.slug,
        description: service.description,
        bannerImg: service.bannerImg,
        iconImg: service.iconImg,
        trending: service.trending,
        categories: categoriesData
      });
    }

    const success = new SuccessHandler(200, "Services retrieved successfully", serviceData);
    return res.status(success.status).json({
      success: true,
      message: success.message,
      data: success.data
    });

  } catch (err) {
    const error = new ErrorHandler(500, err.message);
    return res.status(error.status).json({
      success: false,
      message: error.message
    });
  }
};

// when customer is booking-service by phone call
const createBooking = async (req, res) => {
  try {
    const { userId, customerName, customerPhone, serviceCategoryId, serviceItemId, preferredDate, preferredTimeSlot, bookingType, address } = req.body;

    const errors = validateBookingInfo(req.body);
    if (errors.length > 0) {
      const error = new ErrorHandler(400, "Invalid booking data", errors);
      return res.status(400).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    let expiresAt = bookingType === "online"
      ? new Date(Date.now() + 30 * 60 * 1000)
      : null;

    const bookingResult = await queryAsync(
      `INSERT INTO bookings 
      (userId, customerName, customerPhone, serviceCategoryId,
       serviceItemId, preferredDate, preferredTimeSlot, bookingType, expiresAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId || null, customerName, customerPhone, serviceCategoryId, serviceItemId, preferredDate, preferredTimeSlot, bookingType, expiresAt]
    );

    const bookingId = bookingResult.insertId;

    const { houseNo, street, landmark, area, city, state, pincode, fullAddress } = address;

    await queryAsync(
      `INSERT INTO booking_addresses 
      (bookingId, userId, houseNo, street, landmark, area, city, state, pincode, fullAddress)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [bookingId, userId || null, houseNo, street, landmark || null, area, city, state, pincode || null, fullAddress || null]
    );


    const success = new SuccessHandler(201, "Booking successfully", { bookingId });
    return res.status(success.status).json({
      success: true,
      message: success.message,
      data: success.data,
    });


  } catch (err) {
    const error = new ErrorHandler(500, err.message);
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.errors
    });
  }
};



module.exports = { addServices, addServiceCategories, addServiceItem, addServiceItemFeaturese, getServices,createBooking}
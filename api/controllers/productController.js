const Product = require("../models/Product");
const ApiFeatures = require("../utils/apiFeatures");

// Admin
exports.createProduct = async (req, res) => {
  req.body.user = req.user.id;
  const newproduct = await Product.create(req.body);
  res.status(201).json({ sucess: true, newproduct });
};

// Get All Products
exports.getAllproducts = async (req, res) => {
  const resPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeature.query;
  res.status(200).json({ sucess: true, products, productCount });
};

//Get Details of Product
exports.getProductDetails = async (req, res) => {
  try {
    const productId = await Product.findById(req.params.id);

    if (!productId) {
      throw "No such product exists";
    }
    res.status(200).json({
      sucess: true,
      productId,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        sucess: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      sucess: true,
      product,
    });
  } catch (err) {
    console.log("Error in finding the product", err);
    return;
  }
};

//Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        sucess: false,
        message: "Product not found",
      });
    }
    await Product.deleteOne();
    res.status(200).json({
      sucess: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createProductReview = async (req, res) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  const existingReview = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (existingReview) {
    // Update existing review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Add new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate average rating
  let avg = 0;
  product.reviews.forEach((r) => {
    avg += r.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save();

  res
    .status(201)
    .json({ success: true, message: "Review added successfully." });
};

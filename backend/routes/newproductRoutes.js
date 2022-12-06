import express from "express";
import newProduct from "../models/newproductModel.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const newproductRouter = express.Router();

newproductRouter.get("/", async (req, res) => {
  const newproducts = await newProduct.find();
  res.send(newproducts);
});
newproductRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newnewProduct = new newProduct({
      name: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const newproduct = await newnewProduct.save();
    res.send({ message: "Product Created", newproduct });
  })
);
newproductRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newproductId = req.params.id;
    const newproduct = await newProduct.findById(newproductId);
    if (newproduct) {
      newproduct.name = req.body.name;
      newproduct.slug = req.body.slug;
      newproduct.price = req.body.price;
      newproduct.image = req.body.image;
      newproduct.images = req.body.images;
      newproduct.category = req.body.category;
      newproduct.brand = req.body.brand;
      newproduct.countInStock = req.body.countInStock;
      newproduct.description = req.body.description;
      await newproduct.save();
      res.send({ message: "newProduct Updated" });
    } else {
      res.status(404).send({ message: "newProduct Not Found" });
    }
  })
);
newproductRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newproduct = await newProduct.findById(req.params.id);
    if (newproduct) {
      await newproduct.remove();
      res.send({ message: "newProduct Deleted" });
    } else {
      res.status(404).send({ message: "newProduct Not Found" });
    }
  })
);
newproductRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newproductId = req.params.id;
    const productId = req.params.id;

    const newproduct = await newProduct.findById(newproductId);
    const product = await Product.findById(productId);

    if (newproduct) {
      if (newproduct.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      newproduct.reviews.push(review);
      newproduct.numReviews = newproduct.reviews.length;
      newproduct.rating =
        newproduct.reviews.reduce((a, c) => c.rating + a, 0) /
        newproduct.reviews.length;
      const updatednewProduct = await newproduct.save();
      res.status(201).send({
        message: "Review Created",
        review: updatednewProduct.reviews[updatednewProduct.reviews.length - 1],
        numReviews: newproduct.numReviews,
        rating: newproduct.rating,
      });
    } else if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatednewProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "newProduct Not Found" });
    }
  })
);
const PAGE_SIZE = 6;
newproductRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const newproducts = await newProduct
      .find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countnewProducts = await newProduct.countDocuments();
    res.send({
      newproducts,
      countnewProducts,
      page,
      pages: Math.ceil(countnewProducts / pageSize),
    });
  })
);

newproductRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const newproducts = await newProduct
      .find({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countnewProducts = await newProduct.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      newproducts,
      countnewProducts,
      page,
      pages: Math.ceil(countnewProducts / pageSize),
    });
  })
);

newproductRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await newProduct.find().distinct("category");
    res.send(categories);
  })
);
newproductRouter.get("/slug/:slug", async (req, res) => {
  const newproduct = await newProduct.findOne({
    slug: { $eq: req.params.slug },
  });
  const product = await Product.findOne({
    slug: { $eq: req.params.slug },
  });
  if (newproduct) {
    res.send(newproduct);
  } else if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "newProduct Not Found" });
  }
});
newproductRouter.get("/:id", async (req, res) => {
  const newproduct = await newProduct.findById(req.params.id);
  const product = await Product.findById(req.params.id);

  if (newproduct) {
    res.send(newproduct);
  } else if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "newProduct Not Found" });
  }
});

export default newproductRouter;

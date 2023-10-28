const Product = require('../models/product');
const User = require('../models/user')
const Order = require('../models/orders')

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(products => {
      console.log(products)
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
 req.user 
  .populate('cart.items.productId')
  .then(user => {
    console.log()
    const products = user.cart.items
    res.render('shop/cart',{
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    })
  })
  .catch(err => console.log(err))

};


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findOne({ _id: prodId })
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      console.error(err);
    });

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId) 
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, productData: {...i.productId._doc} }; // Corrected variable name to 'products' and 'productData'
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products // Corrected variable name to 'products'
      });
      return order.save();
    })
    .then(result => {
      req.user.clearCart()
    })
    .then(() => {
      
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};


exports.getOrders = (req, res, next) => {
  Order.find({"user.userId": req.user._id}).then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
    .catch(err => console.log(err));
};

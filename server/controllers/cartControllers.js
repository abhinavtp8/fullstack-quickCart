
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.body;

        // Get actual product from database
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const price = product.discountPrice || product.price;

        let cart = await Cart.findOne({ user: userId });

        // Create new cart
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{
                    product: id,
                    price,
                    quantity: 1,
                }],
                totalPrice: price,
            });
        } else {
            const existingItem = cart.items.find(
                item => item.product.toString() === id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({
                    product: id,
                    price,
                    quantity: 1,
                });
            }

            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            await cart.save();
        }

        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart,
        });

    } catch (error) {
        console.log("Add to cart error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getUserCart = async (req, res) => {
    try {

        const user = req.user;
        const userCart = await Cart.findOne({ user: req.user._id }).populate("items.product")
        res.status(200).json({ success: true, cart: userCart })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

export const removeFromCart = async (req, res) => {
    try {

        const { prodId } = req.params

        const userCart = await Cart.findOne({ user: req.user._id });

        if (!userCart) {
    return res.status(404).json({
        success: false,
        message: "Cart not found"
    });
}

        userCart.items = userCart.items.filter((item) => item.product != prodId)
        userCart.totalPrice = userCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

        await userCart.save()

        res.status(200).json({ success: true, message: " items removed" })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

// Quantity of cart items. increment and decrement

export const updateQuantity = async (req, res) => {
    try {
        const { action, prodId } = req.params;

        const userCart = await Cart.findOne({ user: req.user._id });

        if (!userCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        userCart.items = userCart.items.map((item) => {
            if (item.product == prodId) {
                if (action === "increment") {
                    item.quantity += 1;
                } else if (action === "decrement" && item.quantity > 1) {
                    item.quantity -= 1;
                }
            }
            return item;
        });

        userCart.totalPrice = userCart.items.reduce(
            (acc, item) => acc + (item.price * item.quantity), 0
        );

        await userCart.save();

        res.status(200).json({
            success: true,
            message: "Quantity updated...!!!"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
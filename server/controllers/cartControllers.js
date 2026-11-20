import Cart from "../models/cartModel.js"


export const addToCart = async (req, res) => {
    try {

        // const user = req.params.userId
        const user = req.user

        const { id, price } = req.body

        const isCartExist = await Cart.findOne({ user: user._id });

        if (!isCartExist) {
            const newCart = await Cart.create({ user: user, items: [{ product: id, price: price }], totalPrice: price })
            return res.status(201).json({ message: "item added to cart", success: true, newCart })
        }

        const isProductExist = isCartExist.items.some((item) => item.product == id);

        if (!isProductExist) {
            isCartExist.items.push({ product: id, price: price });
            isCartExist.totalPrice = isCartExist.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
            await isCartExist.save()
            return res.status(201).json({ message: "item added to cart", success: true, isCartExist })

        }

        isCartExist.items = isCartExist.items.map((item) => {
            if (item.product == id) {
                item.quantity += 1
            }
            return item
        })

        isCartExist.totalPrice = isCartExist.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        await isCartExist.save()
        return res.status(201).json({ message: "item added to cart", isCartExist })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

export const getUserCart = async (req, res) => {
    try {

        const user = req.user;
        const userCart = await Cart.findOne({ user: user.id }).populate("items.product")
        res.status(200).json({ success: true, cart: userCart })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

export const removeFromCart = async (req, res) => {
    try {

        const { prodId } = req.params

        const userCart = await Cart.findOne({ user: req.user._id });

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

        const { action, prodId } = req.params

        const userCart = await Cart.findOne({ user: req.user._id });

        userCart.items = userCart.items.map((item) => {
            if (item.product == prodId) {
                if (action === "increment") {
                    item.quantity += 1
                } else {
                    item.quantity -= 1
                }
            }
            return item
        })

        userCart.totalPrice = userCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        await userCart.save()

        res.status(200).json({ success: true, message: " Quantity updated...!!!" })


    } catch (error) {
        console.log(error.message);

        res.status(500).json({ message: error.message, success: false })
    }
}
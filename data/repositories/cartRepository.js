const {PrismaClient} = require('@prisma/client')
const to = require('await-to-js').default;



const prismaClient = new PrismaClient({
    rejectOnNotFound: true
})

module.exports = {
    fetchCartLine,
    addProductToCart,
}

async function addProductToCart(cartId, productId) {
    const cartLine = await prismaClient.cart.update({
        where: {
            id: cartId
        },
        data: {
            cartLines: {
                upsert: {
                    where: {
                        cartId_productId: {
                            cartId: cartId,
                            productId: productId
                        }
                    },
                    create: {
                        productId: productId,
                        quantity: 1
                    },
                    update: {
                        productId: productId,
                        quantity: { increment: 1 }
                    }
                }
            }
        }
    })

    return cartLine;
}

async function fetchCart(cartId) {
    const cart = await prismaClient.cart.findUnique({
        where: { id: cartId },
        include: { cartLines: { include: { product: true } } }
    })
}

async function fetchCartLine(cartId, productId) {
    let err, cartLine;

    [err, cartLine] = await to(prismaClient.cartline.findUnique({
        where: {
            cartId: cartId,
            productId: productId
        },
    }))

    if (err) {
        console.log(err);
        cartLine = undefined //await _createCartLine(cartId, productId);
    }

    return cartLine
}

async function _createCartLine(cartId, productId) {
    return await prismaClient.cartline.create({
        data: {
            cartId: cartId,
            productId: productId,
            quantity: 0
        }
    })
}
const {PrismaClient} = require('@prisma/client')
const to = require('await-to-js').default;



const prismaClient = new PrismaClient({
    rejectOnNotFound: true
})

module.exports = {
    fetchCart,
    addProductToCart,
}

async function addProductToCart(cartId, productId) {
    const cart = await prismaClient.cart.update({
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

    return cart;
}

async function fetchCart(cartId) {
    let err, cart;
    [err, cart] = await to(prismaClient.cart.findUnique({
        where: { id: cartId },
        include: {
            cartLines: {
                include: {
                    product: true
                }
            }
        }
    }));

    if (err) {
        console.log(err);
        return undefined;
    }

    return cart;
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
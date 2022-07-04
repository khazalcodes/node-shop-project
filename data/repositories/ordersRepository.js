const {PrismaClient} = require('@prisma/client')
const to = require('await-to-js').default;

const prismaClient = new PrismaClient({
    rejectOnNotFound: true
})

module.exports = {
    fetchUserOrders,
    createOrder,
}

async function createOrder(userId, cartLinesArray) {
    const order = await prismaClient.order.create({
        data: {
            userId: userId
        }
    })

    const newOrderLines = cartLinesArray.map(cl => ({
        productId: cl.productId,
        quantity: cl.quantity
    }));

    await prismaClient.order.update({
        where: {
            id: order.id
        },
        data: {
            orderLines: {
                createMany: {
                    data: newOrderLines
                }
            }
        }
    })

    await prismaClient.cart.update({
        where: {
            userId: userId
        },
        data: {
            cartLines: {
                deleteMany: {}
            }
        }
    })

    return order;
}

async function fetchUserOrders(userId) {
    let err, cart;
    [err, cart] = await to(prismaClient.order.findMany({
        where: { userId: userId },
        include: {
            orderLines: {
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

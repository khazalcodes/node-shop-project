const {PrismaClient} = require('@prisma/client')
const to = require('await-to-js').default;



const prismaClient = new PrismaClient({
    rejectOnNotFound: true
})

module.exports = {
    fetchUserOrders,
    createOrder,
}

async function createOrder(cartLines, userId) {
    const order = await prismaClient.order.create({
        data: {
            userId: userId
        }
    })

    const newOrderLines = cartLines.map(cl => ({
        orderId: order.id,
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
                    newOrderLines
                }
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

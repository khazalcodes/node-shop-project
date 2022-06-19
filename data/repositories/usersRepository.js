const {PrismaClient} = require('@prisma/client')
const to = require('await-to-js').default;


const prismaClient = new PrismaClient({
    rejectOnNotFound: true
})

module.exports = {
    getRootUser,
    getUser,
}


async function getRootUser() {
    let err, user;

    [err, user]= await to(getUser(parseInt(process.env.ROOT_USER_ID)))

    if (err) {
        console.log(err);
        user = await _createRootUser();
    }

    return user;
}

async function getUser(id) {
    return prismaClient.user.findUnique({
        where: {
            id: id
        }
    });
}

async function _createRootUser() {
    const rootUser = await prismaClient.user.create({
        data: {
            firstName: 'Root',
            lastName: 'Toor',
            emailAddress: 'root@toor.ug',
        }
    })

    if (rootUser.id !== 1) process.env.ROOT_USER_ID = rootUser.id;

    return rootUser;
}

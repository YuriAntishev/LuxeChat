const users = [];

export const addUser = ({ id, room, name }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, room, name };
    users.push(user);

    return { user };
};

export const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);
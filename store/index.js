document.addEventListener('alpine:init', async () => {
    Alpine.store('usersStore',
        {
            users: [],
            user: {
                id: () => Math.random().toString(36).substr(2, 9),
                name: '',
                email: '',
            },
            async addUser() {
                await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    body: JSON.stringify(this.user),
                })
                    .then((response) => response.json())
                    .then(() => {
                        this.users.push(this.user);
                    }
                    );
            },
            async deleteUser(id) {
                await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                    method: 'DELETE',
                })
                    .then((response) => response.json())
                    .then(() => {
                        this.users = this.users.filter((user) => user.id !== id);
                    }
                    );
            },
            async updateUser(user) {
                await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((updatedUser) => {
                        this.users = this.users.map((user) => {
                            if (user.id === updatedUser.id) {
                                return updatedUser;
                            }
                            return user;
                        });
                    }
                    );
            },
            async load() {
                await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'GET',
                })
                    .then((response) => response.json())
                    .then((users) => {
                        this.users = users;
                    }
                    );
            }

        });
})
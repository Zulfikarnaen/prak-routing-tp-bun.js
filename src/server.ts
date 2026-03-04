const server = Bun.serve({
	port: 3001,
	fetch(request) {
        const url = new URL(request.url);
        const path = url.pathname; 
        const method = request.method;
        const users = [
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "123", name: "Charlie" }
            ];
        const start = Date.now();
        const duration = Date.now() - start;
        
        console.log(`Durasi eksekusi: ${duration} ms`);
        console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);
        if (path === '/' && method === 'GET') {
            return new Response('<h1> Halaman Utama (Bun)</h1><p>Selamat datang di server Bun + TypeScript!</p>', {
            headers: { 'Content-Type': 'text/html' },
            });
        }
        else if (path === '/about' && method === 'GET') {
            return new Response('<h1> Tentang Kami (Bun)</h1><p>Routing manual dengan Bun sangat mudah!</p>', {
            headers: { 'Content-Type': 'text/html' },
            });
        }
        else if (path === '/api/users' && method === 'GET') {
            return new Response (JSON.stringify([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
            ]), {
                headers: { 'Content-Type': 'application/json' },
            });
        }
        else if (path.startsWith("/users/") && method === "GET") {
            const parts = path.split("/");
            const id = parts[2];

            const user = users.find(u => u.id === id);

            if (user) {
                return new Response(JSON.stringify(user), {
                headers: { "Content-Type": "application/json" }
                });
            } else {
                return new Response(JSON.stringify({ message: "User tidak ditemukan" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
                });
            }
        }
        else if (path === '/api/users' && method === 'POST') {
            return new Response (JSON.stringify({ message: 'User berhasil dibuat (Bun)' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
            });
        }
        else if (path === '/api/products' && method === 'GET') {
            return new Response (JSON.stringify([
            { id: 1, name: 'Laptop' },
            { id: 2, name: 'Mouse' }
            ]), {
                headers: { 'Content-Type': 'application/json' },
            });
        }
        else if (path === '/api/products' && method === 'POST') {
            return new Response (JSON.stringify({ message: 'Products berhasil dibuat (Bun)' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
            });
        }
        else {
            return new Response('<h1> 404 Halaman Tidak Ditemukan (Bun)</h1>',
    {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
            });
        }
        },
    });

console.log(`Server Bun berjalan di http://localhost:${server.port}`);
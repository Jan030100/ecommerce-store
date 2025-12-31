export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            Shoply
          </h1>

          <div className="flex items-center gap-6">
            <a
              href="/"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="#"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Products
            </a>

            <a
              href="#"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Categories
            </a>

            <button className="relative rounded p-2 text-gray-700 hover:text-blue-600">
              Buy
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

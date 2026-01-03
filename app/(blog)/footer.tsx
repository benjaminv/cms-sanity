import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-5 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">Blog</h3>
            <p className="text-sm text-gray-600 text-pretty">
              A statically generated blog example using Next.js and Sanity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/"
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/studio"
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                Studio
              </Link>
              <a 
                href="https://github.com/benjaminv/cms-sanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <nav className="flex flex-col space-y-2">
              <a 
                href="https://www.sanity.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                Documentation
              </a>
              <a 
                href="https://slack.sanity.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                Community
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} Blog. Built with Next.js and Sanity.
          </p>
        </div>
      </div>
    </footer>
  )
}
import Link from "next/link";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 font-bold text-xl">Klock</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Manage Documents & Chatbots
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            Upload documents, manage files, and embed AI chatbots on your website with ease.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/dashboard">
              <Button variant="primary" size="large">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need in one place
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-lg font-medium text-gray-900">Document Upload</div>
                <p className="mt-2 text-gray-500">
                  Easily upload and manage all your documents in one centralized location.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-lg font-medium text-gray-900">File Management</div>
                <p className="mt-2 text-gray-500">
                  Browse, search, and organize all your uploaded files with our intuitive interface.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-lg font-medium text-gray-900">Chatbot Embed</div>
                <p className="mt-2 text-gray-500">
                  Get a customizable chat widget to embed on your website in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
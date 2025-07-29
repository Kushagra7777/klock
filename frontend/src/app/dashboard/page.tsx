import Link from "next/link";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/Button";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Welcome to your Klock dashboard"
      />
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-md">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload new files to your document library.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/upload">
              <Button variant="primary" className="w-full justify-center">
                Upload Files
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-md">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Manage Files</h3>
              <p className="mt-1 text-sm text-gray-500">
                View and organize all your uploaded files.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/files">
              <Button variant="secondary" className="w-full justify-center">
                View Files
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Embed Chatbot</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get your chat widget code to embed on your site.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/embed">
              <Button variant="secondary" className="w-full justify-center">
                Get Embed Code
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Getting Started</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-900">1. Upload Documents</div>
            <p className="mt-1 text-sm text-gray-500">
              Start by uploading your documents to the system.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-900">2. Manage Files</div>
            <p className="mt-1 text-sm text-gray-500">
              Organize and view all your uploaded files.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-900">3. Embed Chatbot</div>
            <p className="mt-1 text-sm text-gray-500">
              Copy the embed code to add chat to your website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
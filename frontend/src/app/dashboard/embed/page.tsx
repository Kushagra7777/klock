"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function EmbedPage() {
  const [copied, setCopied] = useState(false);
  const [chatId, setChatId] = useState("klock-chat-12345");
  
  const embedCode = `<script src="https://cdn.klock.com/chat-widget.js" data-chat-id="${chatId}"></script>`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateChatId = () => {
    setChatId(`klock-chat-${Math.random().toString(36).substr(2, 9)}`);
    setCopied(false);
  };

  return (
    <div>
      <DashboardHeader 
        title="Embed Chat Widget" 
        subtitle="Add the chat widget to your website"
      />
      
      <div className="mt-8 bg-white shadow rounded-lg p-6 max-w-3xl">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">Embed Code</h3>
          <p className="mt-1 text-sm text-gray-500">
            Copy and paste this code into your website to add the chat widget.
          </p>
        </div>
        
        <div className="relative">
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            {embedCode}
          </pre>
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              onClick={regenerateChatId}
              variant="secondary"
              size="small"
            >
              Regenerate
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="primary"
              size="small"
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="text-md font-medium text-gray-900">Installation Instructions</h4>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-sm text-gray-600">
            <li>Copy the code above</li>
            <li>Paste it just before the closing <code>&lt;/body&gt;</code> tag on your website</li>
            <li>Save and refresh your website to see the chat widget</li>
          </ol>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h4 className="text-md font-medium text-blue-800">Customization Options</h4>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Bottom Right</option>
                <option>Bottom Left</option>
                <option>Top Right</option>
                <option>Top Left</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Theme</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="secondary" size="small">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Preview</h3>
        <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50 h-64 flex items-end justify-end">
          <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          This is how the chat widget will appear on your website.
        </p>
      </div>
    </div>
  );
}
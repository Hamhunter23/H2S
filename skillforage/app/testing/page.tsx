"use client";

import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ChevronRight, Book, Info } from 'lucide-react';

const ImprovedJourneyUI = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="h-full bg-blue-600 text-white">
        <Menu className='text-black'>
          <MenuItem className="text-xl font-bold py-4">Journey</MenuItem>
          <SubMenu label="Module 1">
            <MenuItem icon={<Book size={18} />}>Content 1</MenuItem>
            <MenuItem icon={<Book size={18} />}>Content 2</MenuItem>
          </SubMenu>
          <SubMenu label="Module 2">
            <MenuItem icon={<Book size={18} />}>Content 3</MenuItem>
            <MenuItem icon={<Book size={18} />}>Content 4</MenuItem>
          </SubMenu>
          <SubMenu label="Module 2">
            <MenuItem icon={<Book size={18} />}>Content 3</MenuItem>
            <MenuItem icon={<Book size={18} />}>Content 4</MenuItem>
          </SubMenu>
          <SubMenu label="Module 2">
            <MenuItem icon={<Book size={18} />}>Content 3</MenuItem>
            <MenuItem icon={<Book size={18} />}>Content 4</MenuItem>
          </SubMenu>
          <SubMenu label="Module 2">
            <MenuItem icon={<Book size={18} />}>Content 3</MenuItem>
            <MenuItem icon={<Book size={18} />}>Content 4</MenuItem>
          </SubMenu>
          <SubMenu label="Module 2">
            <MenuItem icon={<Book size={18} />}>Content 3</MenuItem>
            <MenuItem icon={<Book size={18} />}>Content 4</MenuItem>
          </SubMenu>
          <SubMenu label="Module 2">
            <MenuItem icon={<Book size={18} />}>Content 3</MenuItem>
            <MenuItem icon={<Book size={18} />}>Content 4</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold text-gray-800">Content Goes Here</h1>
          <p className="text-sm text-gray-600">Module 1 &gt; Content 1</p>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-black text-xl font-semibold mb-4">Learning Content</h2>
            <p className="text-gray-700">Your main content would go here...</p>
          </div>
        </main>

        {/* Footer with progress */}
        <footer className="bg-white border-t p-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full w-1/3"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Progress: 33%</p>
        </footer>
      </div>

      {/* Right sidebar for additional info/actions */}
      <aside className="w-64 bg-gray-50 p-4 border-l">
        <h3 className="font-semibold text-black text-lg mb-4">Quick Actions</h3>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-2">
          Start Module
        </button>
        <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-300 flex items-center justify-center">
          <Info size={18} className="mr-2" /> Module Details
        </button>
      </aside>
    </div>
  );
};

export default ImprovedJourneyUI;
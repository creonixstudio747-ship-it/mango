import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10 pt-20 pb-10 text-white relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">Nano Banana</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Revolutionizing refreshment with hyper-fresh, cold-pressed elixirs. Pure ingredients, zero compromise.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Shop Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-400 transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Subscriptions</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Gift Cards</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Merch</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Track Order</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Stay Fresh</h4>
          <p className="text-sm text-gray-400 mb-4">Join our newsletter for early access to new seasonal flavors.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500 w-full text-sm placeholder:text-gray-500"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Nano Banana Inc. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

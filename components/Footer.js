// Footer.js
'use client'

function Footer() {
  return (
    <footer className="bg-white shadow-inner py-6 mt-8">
      <div className="container mx-auto text-center text-gray-600">
        &copy; {new Date().getFullYear()} LearnChain. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

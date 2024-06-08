import React from "react";

function Footer() {
  return (
    <footer class="bg-indigo-800 w-full shadow-lg">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="flex items-center justify-between text-center">
          <a class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img
              src="https://www.svgrepo.com/show/226698/crm-crm.svg"
              class="h-14 w-14 size-13"
            />

            <span class="self-center font-semibold whitespace-nowrap text-white">
              <span className="text-5xl">Xe</span>.crm
            </span>
          </a>
        </div>
        <hr class="my-6 border-white sm:mx-auto lg:my-8" />
        <span class="block text-sm text-white text-center ">
          © 2024 Xe.crm . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;

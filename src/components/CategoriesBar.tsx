import Link from "next/link";

function CategoriesBar() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <ul className="flex flex-col space-y-4">
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/">Herbal tea</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/products">Herbal juice</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/customerServices">Essential oils</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/appointments">Herbal ointments</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal Capsules</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbs</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal creams</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal eye drops</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal nasal drops</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal nasal oils</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal cosmetics</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal syrups</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal hydrosols</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Herbal Honey</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Prophetic Medicine</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Prophetic food</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Aromatherapy</Link>
        </li>
        <li className="text-sm font-bold py-2 text-center hover:bg-[#62A83c] rounded-md">
          <Link href="/#about">Traditional medicinal attar</Link>
        </li>
      </ul>
    </div>
  );
}

export default CategoriesBar;

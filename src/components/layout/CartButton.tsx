import { Link } from "react-router-dom";
import { useCart } from "../../state/CartContext";

export function CartButton() {
  const { count } = useCart();
  return (
    <Link
      to="/cart"
      aria-label="View cart"
      className="flex items-center gap-2 rounded-cart-icon-btn bg-header-cart-btn-bg px-3 py-2 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span data-testid="cart-badge" className="font-body font-semibold text-base">
        {count}
      </span>
    </Link>
  );
}

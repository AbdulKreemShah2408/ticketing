import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ].filter(linkConfig => linkConfig);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand">
          <span className="brand__mark">◆</span>
          GitTix
        </Link>
        <nav className="nav">
          {links.map(({ label, href }) => (
            <Link key={href} href={href} className="nav__link">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
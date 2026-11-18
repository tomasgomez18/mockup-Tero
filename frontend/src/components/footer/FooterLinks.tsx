import { Link } from 'react-router'
import type { FooterColumn } from '@/types/navigation'

interface FooterLinksProps {
  column: FooterColumn
}

function FooterLinks({ column }: FooterLinksProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{column.title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {column.links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinks

import TrustedBy from '../TrustedBy.jsx'

export default function ClientsSection({ items = [] }) {
  return (
    <div className="container-px pb-28">
      <TrustedBy clients={items} />
    </div>
  )
}

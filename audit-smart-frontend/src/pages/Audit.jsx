import AuditForm from '../components/AuditForm'
import './Audit.css'

export default function Audit() {
  return (
    <main className="audit-page">
      <div className="container">
        <h1>Smart Contract Audit</h1>
        <AuditForm />
      </div>
    </main>
  )
}
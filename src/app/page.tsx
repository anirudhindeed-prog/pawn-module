export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="text-6xl mb-4">💰</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Pawn Module</h1>
        <p className="text-slate-600 mb-8">Kumudu Jewellery ERP</p>
        <a
          href="/login"
          className="inline-block px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          Get Started
        </a>
      </div>
    </main>
  )
}

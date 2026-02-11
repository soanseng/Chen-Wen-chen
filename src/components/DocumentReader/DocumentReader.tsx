import { useParams, Link } from 'react-router-dom'

export default function DocumentReader() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="p-4">
      <Link to="/browse" className="text-stamp-500 text-sm hover:underline">
        ← 返回檔案列表
      </Link>
      <h2 className="text-lg font-semibold text-ink-700 mt-4 mb-4">
        文件：{id}
      </h2>
      <p className="text-ink-400 text-sm">文件內容載入中…</p>
    </div>
  )
}

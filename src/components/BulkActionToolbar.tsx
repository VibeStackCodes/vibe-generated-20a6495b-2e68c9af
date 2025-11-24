/**
 * Bulk action toolbar for managing multiple tasks
 */

import { Trash2, CheckCircle2, Archive } from 'lucide-react'
import { BulkActionState } from '@/types/task'

interface BulkActionToolbarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onDeleteSelected: () => void
  onCompleteSelected: () => void
  onArchiveSelected: () => void
}

export function BulkActionToolbar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
  onCompleteSelected,
  onArchiveSelected,
}: BulkActionToolbarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-lg dark:border-gray-600 dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {selectedCount} of {totalCount} selected
        </span>
        <button
          onClick={selectedCount === totalCount ? onClearSelection : onSelectAll}
          className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          {selectedCount === totalCount ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCompleteSelected}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          title="Mark selected as complete"
        >
          <CheckCircle2 className="h-4 w-4" />
          Complete
        </button>
        <button
          onClick={onArchiveSelected}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          title="Archive selected"
        >
          <Archive className="h-4 w-4" />
          Archive
        </button>
        <button
          onClick={onDeleteSelected}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
          title="Delete selected"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  )
}

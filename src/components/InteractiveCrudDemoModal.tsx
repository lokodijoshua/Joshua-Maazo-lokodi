import React, { useState } from 'react';
import { Plus, Trash2, Search, X, Download, RotateCcw } from 'lucide-react';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: 'Full Stack' | 'UI/UX' | 'AI Automation' | 'Database';
  assignee: string;
  createdAt: string;
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "tsk-101",
    title: "Implement OAuth 2.0 Client Flow",
    description: "Connect secure token refresh mechanisms and session cookies for user authentication.",
    status: "done",
    priority: "high",
    category: "Full Stack",
    assignee: "Joshua Lokodi",
    createdAt: "2025-02-10"
  },
  {
    id: "tsk-102",
    title: "Vector Search Indexing Pipeline",
    description: "Embed knowledge documents with pgvector and benchmark similarity query latency under 50ms.",
    status: "in-progress",
    priority: "high",
    category: "AI Automation",
    assignee: "Joshua Lokodi",
    createdAt: "2025-02-12"
  },
  {
    id: "tsk-103",
    title: "Design System Dark Theme Contrast Audit",
    description: "Verify WCAG AA 4.5:1 ratio across all interactive buttons, cards, and input borders.",
    status: "review",
    priority: "medium",
    category: "UI/UX",
    assignee: "Sarah K.",
    createdAt: "2025-02-13"
  },
  {
    id: "tsk-104",
    title: "PostgreSQL Database Connection Pooling",
    description: "Configure pgBouncer pool size and optimize idle client disconnect timeouts.",
    status: "todo",
    priority: "medium",
    category: "Database",
    assignee: "Joshua Lokodi",
    createdAt: "2025-02-14"
  }
];

interface InteractiveCrudDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveCrudDemoModal: React.FC<InteractiveCrudDemoModalProps> = ({
  isOpen,
  onClose
}) => {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState<'todo' | 'in-progress' | 'review' | 'done'>('todo');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newCategory, setNewCategory] = useState<'Full Stack' | 'UI/UX' | 'AI Automation' | 'Database'>('Full Stack');

  if (!isOpen) return null;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `tsk-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      description: newDesc.trim() || "No additional description provided.",
      status: newStatus,
      priority: newPriority,
      category: newCategory,
      assignee: "Joshua Lokodi",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks([newTask, ...tasks]);
    setNewTitle("");
    setNewDesc("");
    setIsAddingTask(false);
  };

  const handleStatusChange = (id: string, nextStatus: 'todo' | 'in-progress' | 'review' | 'done') => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleReset = () => {
    setTasks(INITIAL_TASKS);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `swiftflow_tasks_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || t.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const columns: { id: TaskItem['status']; title: string; color: string }[] = [
    { id: 'todo', title: 'To Do', color: 'bg-amber-100 border-amber-300' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 border-blue-300' },
    { id: 'review', title: 'Review', color: 'bg-purple-100 border-purple-300' },
    { id: 'done', title: 'Done', color: 'bg-emerald-100 border-emerald-300' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#fdfbf7] border-neo-thick shadow-neo-lg rounded-2xl overflow-hidden">
        {/* Header Strip */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-lime-300 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm bg-black text-white px-2 py-0.5 rounded">CRUD DEMO</span>
            <h3 className="font-extrabold text-base sm:text-lg text-black">SWIFTFLOW COLLABORATIVE TASK MANAGER</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white hover:bg-rose-100 border-neo rounded-md transition-colors text-black"
            title="Close Demo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border-b-2 border-black">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm font-mono border-neo rounded bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-mono border-neo rounded bg-white"
            >
              <option value="all">Priority: All</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingTask(!isAddingTask)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-bold bg-purple-500 text-white border-neo shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all rounded"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingTask ? 'Cancel' : 'New Task'}</span>
            </button>

            <button
              onClick={handleExportJson}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono bg-white border-neo rounded hover:bg-gray-100"
              title="Export state as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 text-xs font-mono bg-white border-neo rounded hover:bg-gray-100"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Add Task Collapsible Drawer */}
        {isAddingTask && (
          <form onSubmit={handleCreateTask} className="p-4 bg-purple-50 border-b-2 border-black animate-in fade-in duration-150">
            <div className="text-xs font-mono font-bold uppercase text-purple-900 mb-2">Create New Task [POST /api/tasks]</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build GraphQL schema resolver"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border-neo rounded bg-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs border-neo rounded bg-white"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs border-neo rounded bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs border-neo rounded bg-white"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="AI Automation">AI Auto</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Database">Database</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <input
                type="text"
                placeholder="Brief technical requirements..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border-neo rounded bg-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="px-3 py-1 text-xs font-semibold bg-gray-200 hover:bg-gray-300 border-neo rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-xs font-bold bg-lime-400 hover:bg-lime-500 border-neo shadow-neo-sm rounded"
              >
                + Commit Task
              </button>
            </div>
          </form>
        )}

        {/* Kanban Board Columns View */}
        <div className="flex-1 overflow-x-auto p-4 bg-grid-paper">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-w-[760px] h-full items-start">
            {columns.map(col => {
              const colTasks = filteredTasks.filter(t => t.status === col.id);
              return (
                <div key={col.id} className="flex flex-col bg-white border-neo rounded-xl overflow-hidden shadow-neo-sm">
                  {/* Column Header */}
                  <div className={`flex items-center justify-between px-3 py-2 border-b-2 border-black ${col.color}`}>
                    <span className="font-bold text-xs uppercase tracking-wider text-black">{col.title}</span>
                    <span className="px-1.5 py-0.5 text-xs font-mono font-bold bg-black text-white rounded">
                      {colTasks.length}
                    </span>
                  </div>

                  {/* Tasks Container */}
                  <div className="p-2.5 flex flex-col gap-2.5 min-h-[300px] max-h-[55vh] overflow-y-auto">
                    {colTasks.length === 0 ? (
                      <div className="flex items-center justify-center p-6 text-center text-xs text-gray-400 font-mono border border-dashed border-gray-300 rounded-lg">
                        No tasks in this lane
                      </div>
                    ) : (
                      colTasks.map(task => (
                        <div
                          key={task.id}
                          className="group relative p-3 bg-white border-neo rounded-lg hover:shadow-neo transition-all bg-[#fffdf9]"
                        >
                          {/* Priority and Category */}
                          <div className="flex items-center justify-between gap-1 mb-1.5 text-[11px] font-mono">
                            <span className="text-gray-500">{task.category}</span>
                            <span className={`px-1.5 py-0.2 rounded font-bold uppercase text-[10px] ${
                              task.priority === 'high' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                              task.priority === 'medium' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {task.priority}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="font-bold text-xs text-gray-900 leading-snug mb-1">
                            {task.title}
                          </h4>

                          {/* Description */}
                          <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-2.5">
                            {task.description}
                          </p>

                          {/* Move Lane Quick Switcher (Update) */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-[10px] font-mono">
                            <select
                              value={task.status}
                              onChange={(e) => handleStatusChange(task.id, e.target.value as any)}
                              className="px-1.5 py-0.5 text-[10px] bg-gray-50 border border-gray-300 rounded hover:border-black cursor-pointer"
                              title="Update task status"
                            >
                              <option value="todo">→ To Do</option>
                              <option value="in-progress">→ In Progress</option>
                              <option value="review">→ Review</option>
                              <option value="done">→ Done</option>
                            </select>

                            {/* Delete button */}
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-gray-400 hover:text-rose-600 p-1 rounded transition-colors"
                              title="Delete task (DELETE)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-gray-100 border-t-2 border-black flex flex-wrap items-center justify-between text-xs font-mono text-gray-600">
          <div>Status: Real-Time In-Memory CRUD Engine Active · {tasks.length} Total Records</div>
          <div>Developer: Joshua Maazo Lokodi</div>
        </div>
      </div>
    </div>
  );
};

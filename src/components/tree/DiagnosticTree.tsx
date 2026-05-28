'use client';

// Note: xlsx is a browser-only package.
// Import it dynamically inside click handlers:
//   const XLSX = await import('xlsx');
// Do NOT import it at module level.

import { useState, useCallback, useRef } from 'react';
import { TreeNode } from '@/types/union';
import TreeNodeCard from './TreeNodeCard';

interface Props {
  initialNodes: TreeNode[];
}

// ── Tree builder ────────────────────────────────────────────────────────────
function buildTree(flat: TreeNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  // Clone nodes so we can attach children without mutating props
  for (const n of flat) {
    map.set(n.id, { ...n, children: [] });
  }

  for (const n of map.values()) {
    if (n.parent_id == null) {
      roots.push(n);
    } else {
      const parent = map.get(n.parent_id);
      if (parent) {
        parent.children = parent.children ?? [];
        parent.children.push(n);
      }
    }
  }

  // Sort children by sort_order
  function sortChildren(nodes: TreeNode[]) {
    nodes.sort((a, b) => a.sort_order - b.sort_order);
    for (const n of nodes) {
      if (n.children?.length) sortChildren(n.children);
    }
  }
  sortChildren(roots);
  roots.sort((a, b) => a.sort_order - b.sort_order);

  return roots;
}

// ── Collect all node ids at a specific depth ────────────────────────────────
function collectExpandedDefaults(roots: TreeNode[]): Set<string> {
  // Root nodes (depth 0) and their children (depth 1) are expanded by default
  const expanded = new Set<string>();
  for (const root of roots) {
    expanded.add(root.id);
    if (root.children) {
      for (const child of root.children) {
        expanded.add(child.id);
      }
    }
  }
  return expanded;
}

// ── Connector line between parent and child columns ─────────────────────────
function ConnectorLine() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 32,
          height: 2,
          background: 'var(--color-border)',
          borderRadius: 1,
        }}
      />
    </div>
  );
}

// ── Vertical bar connecting sibling nodes ────────────────────────────────────
// Renders a column of children connected by a vertical spine + horizontal branches
function ChildrenColumn({
  children,
  depth,
  expandedIds,
  onToggle,
  onValueChange,
  savingIds,
}: {
  children: TreeNode[];
  depth: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onValueChange: (id: string, value: string) => void;
  savingIds: Set<string>;
}) {
  if (children.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
      {children.map((child, idx) => {
        const isExpanded = expandedIds.has(child.id);
        const hasGrandchildren = (child.children?.length ?? 0) > 0;

        return (
          <div key={child.id} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Vertical connector dot indicator */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {children.length > 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: -20,
                    top: idx === 0 ? '50%' : 0,
                    bottom: idx === children.length - 1 ? '50%' : 0,
                    width: 2,
                    background: 'var(--color-border)',
                  }}
                />
              )}
              {children.length > 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: -20,
                    top: '50%',
                    width: 20,
                    height: 2,
                    background: 'var(--color-border)',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
            </div>

            {/* Node card */}
            <TreeNodeCard
              node={child}
              depth={depth}
              expanded={isExpanded}
              onToggle={() => onToggle(child.id)}
              onValueChange={onValueChange}
              hasChildren={hasGrandchildren}
              isSaving={savingIds.has(child.id)}
            />

            {/* Expand grand-children */}
            {isExpanded && hasGrandchildren && child.children && (
              <>
                <ConnectorLine />
                <ChildrenColumn
                  children={child.children}
                  depth={depth + 1}
                  expandedIds={expandedIds}
                  onToggle={onToggle}
                  onValueChange={onValueChange}
                  savingIds={savingIds}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Root tree level renderer ─────────────────────────────────────────────────
function TreeLevel({
  roots,
  expandedIds,
  onToggle,
  onValueChange,
  savingIds,
}: {
  roots: TreeNode[];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onValueChange: (id: string, value: string) => void;
  savingIds: Set<string>;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      {/* Root nodes column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {roots.map(root => {
          const isExpanded = expandedIds.has(root.id);
          const hasChildren = (root.children?.length ?? 0) > 0;

          return (
            <div key={root.id} style={{ display: 'flex', alignItems: 'center' }}>
              <TreeNodeCard
                node={root}
                depth={0}
                expanded={isExpanded}
                onToggle={() => onToggle(root.id)}
                onValueChange={onValueChange}
                hasChildren={hasChildren}
                isSaving={savingIds.has(root.id)}
              />

              {isExpanded && hasChildren && root.children && (
                <>
                  <ConnectorLine />
                  <ChildrenColumn
                    children={root.children}
                    depth={1}
                    expandedIds={expandedIds}
                    onToggle={onToggle}
                    onValueChange={onValueChange}
                    savingIds={savingIds}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function DiagnosticTree({ initialNodes }: Props) {
  const [flatNodes, setFlatNodes] = useState<TreeNode[]>(initialNodes);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const tree = buildTree(initialNodes);
    return collectExpandedDefaults(tree);
  });
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const tree = buildTree(flatNodes);

  const handleToggle = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Debounced save on value change
  const handleValueChange = useCallback((id: string, value: string) => {
    // Optimistically update local state
    setFlatNodes(prev =>
      prev.map(n => (n.id === id ? { ...n, value: value || null } : n))
    );

    // Debounce the API call
    const existing = saveTimers.current.get(id);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(async () => {
      setSavingIds(prev => new Set(prev).add(id));
      try {
        await fetch('/api/tree', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, value: value || null }),
        });
      } catch {
        // silently fail — value already updated locally
      } finally {
        setSavingIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        saveTimers.current.delete(id);
      }
    }, 800);

    saveTimers.current.set(id, timer);
  }, []);

  // ── Export to Excel ────────────────────────────────────────────────────────
  // xlsx is browser-only — imported dynamically
  const handleExport = async () => {
    const XLSX = await import('xlsx');
    const rows = flatNodes.map(n => ({ node: n.label, value: n.value ?? '' }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Diagnostic Tree');
    XLSX.writeFile(wb, 'diagnostic-tree.xlsx');
  };

  // ── Import from Excel ──────────────────────────────────────────────────────
  // xlsx is browser-only — imported dynamically
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(null);

    try {
      const XLSX = await import('xlsx');
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type: 'array' });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json<{ node: string; value: string }>(ws);

      if (!rows.length || !('node' in rows[0])) {
        throw new Error('File must have "node" and "value" columns');
      }

      const payload = rows.map(r => ({
        label: String(r.node ?? '').trim(),
        value: r.value != null ? String(r.value).trim() : null,
      })).filter(r => r.label);

      const res = await fetch('/api/tree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Import failed');
      }

      // Refresh nodes from server
      const updated = await fetch('/api/tree', { cache: 'no-store' });
      if (updated.ok) {
        const freshNodes: TreeNode[] = await updated.json();
        setFlatNodes(freshNodes);
        setImportSuccess(`Imported ${payload.length} row${payload.length !== 1 ? 's' : ''} successfully`);
      }
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      // Reset file input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ padding: '28px 32px', minHeight: '100%' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
              }}
            >
              Project Union · Internal
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 5px',
                borderRadius: 3,
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              internal
            </span>
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Diagnostic Tree
          </h1>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
            EBITDA decomposition — click any node to expand its children
          </div>
        </div>

        {/* Action buttons */}
        {/* Note: xlsx is browser-only — imported dynamically inside handlers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Hidden file input for import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={handleImport}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 14px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              fontSize: 12,
              fontWeight: 600,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ fontSize: 14 }}>↑</span>
            Import Excel
          </button>

          <button
            onClick={handleExport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 14px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              fontSize: 12,
              fontWeight: 600,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ fontSize: 14 }}>↓</span>
            Export
          </button>
        </div>
      </div>

      {/* Import status messages */}
      {importError && (
        <div
          style={{
            marginBottom: 16,
            padding: '10px 14px',
            background: 'var(--color-coral-soft)',
            color: 'var(--color-coral)',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{importError}</span>
          <button
            onClick={() => setImportError(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-coral)',
              fontSize: 16,
              cursor: 'pointer',
              padding: '0 0 0 12px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      {importSuccess && (
        <div
          style={{
            marginBottom: 16,
            padding: '10px 14px',
            background: 'var(--color-accent-soft)',
            color: 'var(--color-accent)',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{importSuccess}</span>
          <button
            onClick={() => setImportSuccess(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-accent)',
              fontSize: 16,
              cursor: 'pointer',
              padding: '0 0 0 12px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 24,
          padding: '10px 16px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Root / EBITDA', color: 'var(--color-accent)', bg: 'var(--color-accent-soft)' },
          { label: 'Level 1 (Revenue / Cost)', color: 'var(--color-gold)', bg: 'var(--color-gold-soft)' },
          { label: 'Leaf nodes', color: 'var(--color-text-primary)', bg: 'var(--color-surface-2)' },
        ].map(({ label, color, bg }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: bg,
                border: `1.5px solid ${color}`,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              {label}
            </span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center' }}>
          {flatNodes.length} nodes
        </div>
      </div>

      {/* Tree content */}
      {tree.length === 0 ? (
        <div
          style={{
            padding: '60px 24px',
            textAlign: 'center',
            color: 'var(--color-text-tertiary)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 10,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>⬡</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>No tree data yet</div>
          <div style={{ fontSize: 12 }}>
            Import an Excel file with{' '}
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-surface-2)',
                padding: '1px 5px',
                borderRadius: 3,
              }}
            >
              node
            </code>{' '}
            and{' '}
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-surface-2)',
                padding: '1px 5px',
                borderRadius: 3,
              }}
            >
              value
            </code>{' '}
            columns to populate the tree.
          </div>
        </div>
      ) : (
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            padding: '28px 24px',
            overflowX: 'auto',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'inline-block', minWidth: '100%' }}>
            <TreeLevel
              roots={tree}
              expandedIds={expandedIds}
              onToggle={handleToggle}
              onValueChange={handleValueChange}
              savingIds={savingIds}
            />
          </div>
        </div>
      )}

      {/* Footer hint */}
      <div
        style={{
          marginTop: 12,
          fontSize: 11,
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Click the ▶ chevron on any node to expand its children · Editable nodes save automatically
      </div>
    </div>
  );
}

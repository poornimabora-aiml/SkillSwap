import React, { useState, useEffect } from 'react';
import { X, Database, Layers, CheckCircle2, Copy, Check, Table, Code2, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function ERDiagramModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('schema'); // 'schema' | 'er' | 'normalization' | 'sql'
  const [schemaData, setSchemaData] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.getDbeSchema().then(setSchemaData).catch(console.error);
  }, []);

  const rawSQL = `-- SkillSwap: Reciprocal Two-Way Relational Matching Query
SELECT 
    u1.user_id AS user_a_id,
    u1.full_name AS user_a_name,
    s_a.skill_name AS a_teaches,
    u2.user_id AS user_b_id,
    u2.full_name AS user_b_name,
    s_b.skill_name AS b_teaches,
    100 AS match_percentage
FROM User_Skills us_a_teach
JOIN Skills s_a ON us_a_teach.skill_id = s_a.skill_id AND us_a_teach.skill_type = 'Teach'
JOIN User_Skills us_b_learn ON us_b_learn.skill_id = s_a.skill_id AND us_b_learn.skill_type = 'Learn'
JOIN User_Skills us_b_teach ON us_b_teach.user_id = us_b_learn.user_id AND us_b_teach.skill_type = 'Teach'
JOIN Skills s_b ON us_b_teach.skill_id = s_b.skill_id
JOIN User_Skills us_a_learn ON us_a_learn.user_id = us_a_teach.user_id 
    AND us_a_learn.skill_id = s_b.skill_id 
    AND us_a_learn.skill_type = 'Learn'
JOIN Users u1 ON u1.user_id = us_a_teach.user_id
JOIN Users u2 ON u2.user_id = us_b_learn.user_id
WHERE u1.user_id <> u2.user_id;`;

  const copySQL = () => {
    navigator.clipboard.writeText(rawSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Modal Topbar */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Database Engineering (DBE) Specifications
              </div>
              <h2 className="text-lg font-bold text-white">
                Relational Architecture & Schema Design
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/30 gap-2">
          {[
            { id: 'schema', label: '6 DBE Tables', icon: Table },
            { id: 'er', label: 'ER Diagram & Cardinality', icon: Layers },
            { id: 'normalization', label: 'Normalization (3NF)', icon: CheckCircle2 },
            { id: 'sql', label: 'Matching SQL Query', icon: Code2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                  active
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: 6 DBE TABLES */}
          {activeTab === 'schema' && (
            <div className="space-y-6">
              <p className="text-slate-400">
                The database is organized into 6 normalized relational tables with explicit primary keys, foreign keys, cascading rules, and check constraints:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schemaData.map((tbl) => (
                  <div key={tbl.table_name} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="font-bold text-sm text-indigo-300 font-mono">
                        {tbl.table_name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                        PK: {tbl.primary_key}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{tbl.description}</p>
                    <div className="space-y-1 font-mono text-[11px]">
                      {tbl.columns.map((col) => (
                        <div key={col.name} className="flex items-center justify-between text-slate-300 bg-slate-900/50 px-2 py-1 rounded">
                          <span className="text-indigo-400">{col.name}</span>
                          <span className="text-slate-500">{col.type}</span>
                          <span className="text-[10px] text-amber-400/90">{col.constraint}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ER DIAGRAM */}
          {activeTab === 'er' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                <h4 className="font-bold text-indigo-400 text-sm mb-3">
                  Relational Cardinality & Dependencies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <strong className="text-indigo-300">Users ➔ User_Skills:</strong> 1:N (One user maps to multiple teach/learn skills)
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <strong className="text-purple-300">Skills ➔ User_Skills:</strong> 1:N (Master catalog to user proficiency)
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <strong className="text-sky-300">Users ➔ Exchange_Requests:</strong> 1:N as Requester, 1:N as Receiver
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <strong className="text-emerald-300">Exchange_Requests ➔ Exchanges:</strong> 1:1 (When Accepted, creates 1 Exchange)
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 sm:col-span-2">
                    <strong className="text-amber-300">Exchanges ➔ Reviews:</strong> 1:N (Each participant submits 1 rating & feedback)
                  </div>
                </div>
              </div>

              {/* Textual ER Flow Representation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-indigo-300 space-y-2">
                <div className="text-slate-500 font-bold">// Relational Mapping Architecture</div>
                <div>[Users] ──(1:N)──&lt; [User_Skills] &gt;──(N:1)── [Skills]</div>
                <div>  │                                              │</div>
                <div>  ├──(Requester)──&gt; [Exchange_Requests] &lt;──(Offered / Requested Skill)</div>
                <div>  └──(Receiver)───&gt;         │</div>
                <div>                    (1:1 on Accept)</div>
                <div>                            ▼</div>
                <div>                       [Exchanges] ──(1:N)──&gt; [Reviews]</div>
              </div>
            </div>
          )}

          {/* TAB 3: NORMALIZATION */}
          {activeTab === 'normalization' && (
            <div className="space-y-4 text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  First Normal Form (1NF) Satisfied
                </h4>
                <p className="text-slate-400">
                  Every column contains strictly atomic, single-valued attributes. Skills are not stored as comma-separated strings inside the Users table; instead, they are normalized into distinct rows in `User_Skills`.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Second Normal Form (2NF) Satisfied
                </h4>
                <p className="text-slate-400">
                  The schema is in 1NF and contains zero partial functional dependencies. In the junction table `User_Skills`, attributes like `proficiency_level` and `skill_type` depend on the composite user-skill relationship. Skill metadata (`category`, `description`) is placed in the `Skills` table.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Third Normal Form (3NF) & BCNF Satisfied
                </h4>
                <p className="text-slate-400">
                  No transitive functional dependencies exist (i.e., non-prime attributes do not determine other non-prime attributes). Every determinant in the schema functions as a candidate key.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SQL QUERY */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-400">
                  Core relational query implementing the Two-Way Matching condition:
                </p>
                <button
                  onClick={copySQL}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy SQL'}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono overflow-x-auto text-[11px] leading-relaxed">
                {rawSQL}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Project by Poornima Bora • Database Engineering</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
type Msg = {
  from: "user" | "system";
  text: string;
};
export default function Terminal() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "system",
      text: "infra-bot connected to prod-cluster-01",
    },
    {
      from: "system",
      text: "Type 'help' for available commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  function respond(cmd: string) {
    const replies: Record<string, string> = {
      whoami:
        "node_id: zaki.bawade\n" +
        "role: devops_sre_engineer\n" +
        "cluster: production_infra\n" +
        "focus: automation , cloud platforms , reliability engineering\n" +
        "runtime_status: healthy\n" +
        "error_budget: 99.95%",

      skills:
        "=== programming_scripting ===\n" +
        "bash · golang · python\n\n" +
        "=== devops_automation_iac ===\n" +
        "ansible · docker · git · github · github-actions · jenkins\n" +
        "kubernetes · puppet · rancher · terraform\n\n" +
        "=== monitoring_observability_incident ===\n" +
        "catchpoint · grafana · opsgenie · splunk\n\n" +
        "=== cloud_platforms ===\n" +
        "aws · vmware\n\n" +
        "=== networking_security ===\n" +
        "aruba · cisco-meraki · cisco-sdwan · dhcp · dns\n" +
        "juniper · routing · vlans · zscaler\n\n" +
        "=== enterprise_identity_endpoint ===\n" +
        "active-directory · microsoft-intune · power-automate · sccm",

      uptime:
        "sre_console:\n" +
        "deployment_model: automated\n" +
        "incident_response: enabled\n" +
        "observability: active\n" +
        "change_failure_rate: low\n" +
        "mttr: optimized\n" +
        "latency_profile: stable",

      experience:
        "infra_years: 5+\n" +
        "specializations:\n" +
        "- enterprise linux & network operations\n" +
        "- automation-first infrastructure\n" +
        "- ci/cd & container deployments\n" +
        "- monitoring & performance analysis\n" +
        "- enterprise connectivity & zero-trust environments",

      projects:
        "live_systems:\n" +
        "- ha kubernetes clusters via ansible + rancher\n" +
        "- proxmox lxc github-actions runners\n" +
        "- ansible awx infrastructure automation\n" +
        "- aws end-to-end web deployment\n" +
        "- application performance monitoring tooling",

      contact:
        "email: bawadezaki@gmail.com\n" +
        "linkedin: https://www.linkedin.com/in/zaki-bawade/\n" +
        "status: reachable",

      help:
        "borg_console_commands:\n" +
        "whoami | skills | experience | projects | uptime | contact",
    };

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "system",
          text: replies[cmd] || 'command not found — type "help"',
        },
      ]);
    }, 1000);
  }

  function handleCommand(cmd: string) {
    setMessages((m) => [
      ...m,
      {
        from: "user",
        text: cmd,
      },
    ]);
    respond(cmd);
  }
  return (
    <div className="h-full flex flex-col rounded-xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/40 shadow-2xl font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/40 bg-slate-900/60 rounded-t-xl">
        <span className="text-slate-300 text-xs">
          infra-bot@prod-cluster-01
        </span>
        <span className="text-emerald-400 text-xs">● live</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-slate-200">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-3 py-2 border rounded-md ${m.from === "user" ? "ml-auto bg-cyan-500/10 border-cyan-400/30 text-cyan-200" : "bg-slate-800/60 border-slate-700/50"}`}
          >
            <span className="whitespace-pre-wrap">{m.text}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700/40 px-4 py-3">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              handleCommand(input.trim());
              setInput("");
            }
          }}
          placeholder="type a command…"
          className="w-full bg-transparent outline-none text-slate-100 caret-cyan-400 placeholder-slate-500"
        />
      </div>
    </div>
  );
}

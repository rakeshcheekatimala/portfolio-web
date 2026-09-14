export type FeaturedBuild = {
  title: string
  summary: string
  proof: string
  href: string
  tags: string[]
}

export type EngineeringNote = {
  title: string
  summary: string
  href: string
  source: string
  tags: string[]
}

export const recruiterFit = [
  'Senior Frontend Engineer',
  'Frontend Platform Engineer',
  'Applied AI Engineer',
  'Developer Experience Engineer',
  'AI platform / LLMOps-adjacent teams',
]

export const featuredBuilds: FeaturedBuild[] = [
  {
    title: 'AnswerLint',
    summary:
      'An open-source CLI and web product that audits whether content is ready for answer engines, AI search, and citation-driven discovery.',
    proof:
      'Deterministic AEO/GEO checks, llms.txt generation, CI quality gates, diff reports, and evidence-backed recommendations.',
    href: 'https://github.com/rakeshcheekatimala/answerlint',
    tags: ['TypeScript', 'CLI', 'AI visibility', 'CI'],
  },
  {
    title: 'SkillTrustOps',
    summary:
      'A focused experiment for reviewing AI agent skills before they are allowed to run inside an organization.',
    proof:
      'Connects AI safety, policy checks, and practical platform governance into a product-shaped prototype.',
    href: 'https://github.com/rakeshcheekatimala/skilltrustops',
    tags: ['AI safety', 'Agent skills', 'Governance'],
  },
  {
    title: 'APISpec to MCP',
    summary:
      'A developer-tooling exploration for turning API specifications into MCP server implementation plans.',
    proof:
      'Shows the bridge between production API thinking, agents, and developer workflow automation.',
    href: 'https://github.com/rakeshcheekatimala/apispec-to-mcp',
    tags: ['MCP', 'APIs', 'Developer tools'],
  },
]

export const engineeringNotes: EngineeringNote[] = [
  {
    title: 'AI Gateway: Building a Reliable Control Plane for LLM Applications',
    summary:
      'A practical breakdown of model routing, caching, reliability, FinOps, governance, security, and observability for production AI systems.',
    href: 'https://www.linkedin.com/pulse/ai-gateway-building-reliable-control-plane-llm-rakesh-cheekatimala-aazoc',
    source: 'LinkedIn article',
    tags: ['AI Gateway', 'LLMOps', 'Platform engineering'],
  },
  {
    title: 'The Multi-Agent Coding Orchestration Pipeline built using opencode',
    summary:
      'A hands-on local setup for using different coding agents and models across planning, building, and review workflows.',
    href: 'https://rakeshcheekatimala.substack.com/p/the-multi-agent-coding-orchestration',
    source: 'Substack',
    tags: ['Agents', 'Developer workflow', 'OpenCode'],
  },
  {
    title: 'Software Supply Chain Security: First Principles, Standards, and Tools',
    summary:
      'A writing thread that connects dependency safety, provenance, scans, and release trust to day-to-day engineering practice.',
    href: 'https://www.linkedin.com/in/rakesh-cheekatimala/recent-activity/articles/',
    source: 'LinkedIn articles',
    tags: ['Security', 'Supply chain', 'Release trust'],
  },
]
